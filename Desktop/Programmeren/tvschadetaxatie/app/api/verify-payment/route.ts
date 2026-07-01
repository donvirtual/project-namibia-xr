import { NextResponse } from "next/server"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification, sendCustomerFactuur } from "@/lib/resend"

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

  const updated = await updateOrder(orderId, {
    status: "paid",
    paidAt: new Date().toISOString(),
  })

  if (updated) {
    await Promise.all([
      sendCustomerConfirmation(updated),
      sendAdminNotification(updated),
      sendCustomerFactuur(updated),
    ])
    console.log(`verify-payment: ${orderId} marked paid, emails sent`)
  }

  return NextResponse.json({ ok: true, status: "paid" })
}
