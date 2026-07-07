import { NextResponse } from "next/server"
import { getOrder } from "@/lib/orders"
import { sendRapportToCustomer } from "@/lib/resend"

export const runtime = "nodejs"
export const maxDuration = 60

function checkAuth(request: Request) {
  const auth = request.headers.get("authorization")
  if (!auth) return false
  const password = auth.replace("Bearer ", "").trim()
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim()
  return expected && password === expected
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { orderId, testEmail, herzien } = await request.json()
  const order = await getOrder(orderId)
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
  if (!order.rapportUrl) return NextResponse.json({ error: "Rapport not generated yet" }, { status: 400 })

  let pdfError: string | undefined
  await sendRapportToCustomer(order, order.rapportUrl, { testEmail, herzien }).catch((e: unknown) => {
    pdfError = String(e)
  })

  return NextResponse.json({ ok: true, pdfError })
}
