import { NextResponse } from "next/server"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification, sendCustomerFactuur } from "@/lib/resend"

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
      await Promise.all([
        sendCustomerConfirmation(updatedOrder),
        sendAdminNotification(updatedOrder),
        sendCustomerFactuur(updatedOrder),
      ])
      console.log(`Webhook: order ${orderId} marked paid, emails sent`)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
