import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getOrder, updateOrder } from "@/lib/orders"
import { generateRapportAssessment, generateKnownIssues } from "@/lib/claude"
import { generateRapportHTML } from "@/lib/rapport"

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

  const { orderId } = await request.json()
  const order = await getOrder(orderId)
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })

  const [assessment, bekendeProblemen] = await Promise.all([
    generateRapportAssessment(order),
    generateKnownIssues(order),
  ])
  const html = generateRapportHTML(order, assessment)

  const token = process.env.BLOB_READ_WRITE_TOKEN
  const blob = await put(`rapporten/${orderId}.html`, html, {
    access: "public",
    token,
    allowOverwrite: true,
    contentType: "text/html; charset=utf-8",
  })

  await updateOrder(orderId, {
    rapportUrl: blob.url,
    rapportAssessment: assessment,
    bekendeProblemenGevonden: bekendeProblemen,
  })

  return NextResponse.json({ url: blob.url, assessment, bekendeProblemen })
}
