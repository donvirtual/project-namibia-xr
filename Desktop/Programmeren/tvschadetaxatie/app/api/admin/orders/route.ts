import { NextResponse } from "next/server"
import { getAllOrders } from "@/lib/orders"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const auth = request.headers.get("authorization")
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const password = auth.replace("Bearer ", "").trim()
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim()
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const orders = await getAllOrders()
  return NextResponse.json({ orders })
}
