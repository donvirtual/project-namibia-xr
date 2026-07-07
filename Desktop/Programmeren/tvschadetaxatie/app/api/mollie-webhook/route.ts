import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder, tryClaimOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification, sendCustomerFactuur } from "@/lib/resend"
import { generateRapportAssessment, generateKnownIssues } from "@/lib/claude"
import { generateRapportHTML } from "@/lib/rapport"

export async function POST(request: Request) {
  try {
    const body = await request.formData()
    const paymentId = body.get("id") as string

    if (!paymentId) {
      return NextResponse.json({ error: "No payment ID" }, { status: 400 })
    }

    const payment = await getPayment(paymentId)
    console.log(`Webhook: payment ${paymentId} status=${payment.status}`)

    if (payment.status !== "paid") {
      return NextResponse.json({ ok: true })
    }

    const orderId = payment.metadata?.orderId
    if (!orderId) {
      console.error(`Webhook: no orderId in metadata for payment ${paymentId}`)
      return NextResponse.json({ error: "No order ID in metadata" }, { status: 400 })
    }

    const order = await getOrder(orderId)
    if (!order) {
      console.error(`Webhook: order ${orderId} not found`)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Voorkom dubbele emails — alleen verwerken als nog pending
    if (order.status !== "pending_payment") {
      console.log(`Webhook: order ${orderId} already processed (status=${order.status}), skipping`)
      return NextResponse.json({ ok: true })
    }

    // Lock — voorkomt dat een gelijktijdige Mollie-retry of de verify-payment
    // fallback dezelfde order nogmaals verwerkt (race condition tussen de check
    // hierboven en de update hieronder)
    if (!(await tryClaimOrder(orderId))) {
      console.log(`Webhook: order ${orderId} wordt al verwerkt door een andere aanroep, skip`)
      return NextResponse.json({ ok: true })
    }

    const updatedOrder = await updateOrder(orderId, {
      status: "paid",
      paidAt: new Date().toISOString(),
    })

    if (updatedOrder) {
      let finalOrder = updatedOrder
      try {
        const [assessment, bekendeProblemen] = await Promise.all([
          generateRapportAssessment(updatedOrder),
          generateKnownIssues(updatedOrder),
        ])
        const html = generateRapportHTML(updatedOrder, assessment)
        const token = process.env.BLOB_READ_WRITE_TOKEN
        const blob = await put(`rapporten/${orderId}.html`, html, {
          access: "public", token, allowOverwrite: true, contentType: "text/html; charset=utf-8",
        })
        finalOrder = await updateOrder(orderId, {
          rapportUrl: blob.url,
          rapportAssessment: assessment,
          bekendeProblemenGevonden: bekendeProblemen,
        }) ?? updatedOrder
      } catch (err) {
        console.error(`Webhook: rapport generatie mislukt`, err)
      }

      await Promise.all([
        sendCustomerConfirmation(finalOrder),
        sendCustomerFactuur(finalOrder),
        sendAdminNotification(finalOrder),
      ])
      console.log(`Webhook: order ${orderId} klaar, emails verstuurd`)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
