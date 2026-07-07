import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getPayment } from "@/lib/mollie"
import { getOrder, updateOrder, tryClaimOrder } from "@/lib/orders"
import { sendCustomerConfirmation, sendAdminNotification, sendCustomerFactuur } from "@/lib/resend"
import { generateRapportAssessment, generateKnownIssues } from "@/lib/claude"
import { generateRapportHTML } from "@/lib/rapport"

export const runtime = "nodejs"
export const maxDuration = 60

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

  // Lock — voorkomt dat deze fallback-check en de echte mollie-webhook
  // (die mogelijk gelijktijdig binnenkomt) de order allebei verwerken en
  // dubbele mails versturen
  if (!(await tryClaimOrder(orderId))) {
    console.log(`verify-payment: ${orderId} wordt al verwerkt door de webhook, skip`)
    return NextResponse.json({ ok: true, status: "paid" })
  }

  let updated = await updateOrder(orderId, { status: "paid", paidAt: new Date().toISOString() })
  if (!updated) return NextResponse.json({ ok: false, reason: "update_failed" })

  // Genereer rapport VOOR admin email
  let rapportUrl: string | undefined
  try {
    const [assessment, bekendeProblemen] = await Promise.all([
      generateRapportAssessment(updated),
      generateKnownIssues(updated),
    ])
    const html = generateRapportHTML(updated, assessment)
    const token = process.env.BLOB_READ_WRITE_TOKEN
    const blob = await put(`rapporten/${orderId}.html`, html, {
      access: "public", token, allowOverwrite: true, contentType: "text/html; charset=utf-8",
    })
    rapportUrl = blob.url
    updated = await updateOrder(orderId, {
      rapportUrl,
      rapportAssessment: assessment,
      bekendeProblemenGevonden: bekendeProblemen,
    }) ?? updated
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
