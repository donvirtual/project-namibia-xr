import { NextResponse } from "next/server"
import { updateOrder, getOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/resend"

export const runtime = "nodejs"

function checkAuth(request: Request) {
  const auth = request.headers.get("authorization")
  if (!auth) return false
  const password = auth.replace("Bearer ", "").trim()
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim()
  return expected && password === expected
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { orderId, status, sendEmails } = await request.json()

  const order = await updateOrder(orderId, {
    status,
    ...(status === "paid" ? { paidAt: new Date().toISOString() } : {}),
    ...(status === "completed" ? { completedAt: new Date().toISOString() } : {}),
  })

  if (sendEmails && order) {
    await Promise.all([
      sendCustomerConfirmation(order),
      sendAdminNotification(order),
    ])
  }

  return NextResponse.json({ order })
}
