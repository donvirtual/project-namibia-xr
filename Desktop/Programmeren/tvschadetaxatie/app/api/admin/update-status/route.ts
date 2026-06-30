import { NextResponse } from "next/server"
import { updateOrder } from "@/lib/orders"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const auth = request.headers.get("authorization")
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const password = auth.replace("Bearer ", "").trim()
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim()
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { orderId, status } = await request.json()

  const order = await updateOrder(orderId, {
    status,
    ...(status === "completed" ? { completedAt: new Date().toISOString() } : {}),
  })

  return NextResponse.json({ order })
}
