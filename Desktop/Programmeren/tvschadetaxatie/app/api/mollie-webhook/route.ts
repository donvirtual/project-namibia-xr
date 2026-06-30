import { NextResponse } from "next/server"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/resend"

export async function POST(request: Request) {
  try {
    const body = await request.formData()
    const paymentId = body.get("id") as string

    if (!paymentId) {
      return NextResponse.json({ error: "No payment ID" }, { status: 400 })
    }

    const payment = await getPayment(paymentId)

    if (payment.status !== "paid") {
      return NextResponse.json({ ok: true })
    }

    const orderId = payment.metadata?.orderId
    if (!orderId) {
      return NextResponse.json({ error: "No order ID in metadata" }, { status: 400 })
    }

    const order = await getOrder(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.status !== "pending_payment") {
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
      ])
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
