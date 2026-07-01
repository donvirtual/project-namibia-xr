import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification, sendCustomerFactuur } from "@/lib/resend"
import { generateRapportAssessment } from "@/lib/claude"
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

    const updatedOrder = await updateOrder(orderId, {
      status: "paid",
      paidAt: new Date().toISOString(),
    })

    if (updatedOrder) {
      let finalOrder = updatedOrder
      try {
        const assessment = await generateRapportAssessment(updatedOrder)
        const html = generateRapportHTML(updatedOrder, assessment)
        const token = process.env.BLOB_READ_WRITE_TOKEN
        const blob = await put(`rapporten/${orderId}.html`, html, {
          access: "public", token, allowOverwrite: true, contentType: "text/html; charset=utf-8",
        })
        finalOrder = await updateOrder(orderId, { rapportUrl: blob.url }) ?? updatedOrder
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
