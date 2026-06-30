import { NextResponse } from "next/server"
import { createOrder, updateOrder } from "@/lib/orders"
import { createPayment } from "@/lib/mollie"
import { AB_VARIANTS, getVariant, type Variant } from "@/lib/abtest"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Valideer variant server-side — client mag prijs niet zelf kiezen
    const variant: Variant = getVariant(body.abVariant)
    const { mollieAmount, price } = AB_VARIANTS[variant]

    const order = await createOrder({
      customerName: body.naam,
      customerEmail: body.email,
      customerPhone: body.telefoon,
      merk: body.merk,
      model: body.model,
      schermformaat: body.schermformaat,
      aanschafjaar: Number(body.aanschafjaar),
      aankoopprijs: Number(body.aankoopprijs),
      oorzaak: body.oorzaak,
      omschrijving: body.omschrijving,
      fotos: body.fotos || [],
      verzekeraar: body.verzekeraar,
      referentieNummer: body.referentieNummer,
      opmerkingen: body.opmerkingen,
      abVariant: variant,
      betaaldPrijs: Number(price),
    })

    const baseUrl = ((process.env.NEXT_PUBLIC_URL ?? "").replace(/﻿/g, "").trim()) || "https://tvschaderapport.nl"

    const payment = await createPayment(
      order.orderId,
      mollieAmount,
      `${baseUrl}/bedankt?order=${order.orderId}`,
      `${baseUrl}/api/mollie-webhook`
    )

    await updateOrder(order.orderId, { molliePaymentId: payment.id })

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order", detail: String(error) }, { status: 500 })
  }
}
