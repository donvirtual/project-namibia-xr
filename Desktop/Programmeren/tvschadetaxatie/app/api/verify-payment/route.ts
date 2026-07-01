import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification, sendCustomerFactuur } from "@/lib/resend"
import { generateRapportAssessment } from "@/lib/claude"
import { generateRapportHTML } from "@/lib/rapport"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("order")
  if (!orderId) return NextResponse.json({ ok: false })

  const order = await getOrder(orderId)
  if (!order) return NextResponse.json({ ok: false, reason: "not_found" })
  if (order.status !== "pending_payment") {
    return NextResponse.json({ ok: true, status: order.status })
  }
  if (!order.molliePaymentId) return NextResponse.json({ ok: false, reason: "no_payment_id" })

  const payment = await getPayment(order.molliePaymentId)
  console.log(`verify-payment: ${orderId} → Mollie status=${payment.status}`)

  if (payment.status !== "paid") {
    return NextResponse.json({ ok: true, status: payment.status })
  }

  let updated = await updateOrder(orderId, { status: "paid", paidAt: new Date().toISOString() })
  if (!updated) return NextResponse.json({ ok: false, reason: "update_failed" })

  // Genereer rapport VOOR admin email
  let rapportUrl: string | undefined
  try {
    const assessment = await generateRapportAssessment(updated)
    const html = generateRapportHTML(updated, assessment)
    const token = process.env.BLOB_READ_WRITE_TOKEN
    const blob = await put(`rapporten/${orderId}.html`, html, {
      access: "public", token, allowOverwrite: true, contentType: "text/html; charset=utf-8",
    })
    rapportUrl = blob.url
    updated = await updateOrder(orderId, { rapportUrl }) ?? updated
    console.log(`verify-payment: rapport gegenereerd ${rapportUrl}`)
  } catch (err) {
    console.error("verify-payment: rapport generatie mislukt", err)
  }

  await Promise.all([
    sendCustomerConfirmation(updated),
    sendCustomerFactuur(updated),
    sendAdminNotification(updated),
  ])
  console.log(`verify-payment: ${orderId} klaar, emails verstuurd`)

  return NextResponse.json({ ok: true, status: "paid", rapportUrl })
}
