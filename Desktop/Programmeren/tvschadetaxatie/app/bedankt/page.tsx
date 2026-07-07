"use client"
import Link from "next/link"
import { useEffect } from "react"
import { AB_COOKIE, AB_VARIANTS, getVariant } from "@/lib/abtest"

export default function BedanktPage() {
  useEffect(() => {
    // Webhook fallback: verifieer betaling via Mollie als webhook niet aankwam
    const orderId = new URLSearchParams(window.location.search).get("order")
    if (orderId) {
      fetch(`/api/verify-payment?order=${orderId}`).catch(() => {})
    }

    // Echte betaalde prijs via AB-cookie
    const match = document.cookie.match(new RegExp(`(?:^|; )${AB_COOKIE}=([^;]*)`))
    const value = Number(AB_VARIANTS[getVariant(match?.[1])].price)

    // Google Ads + GA4 conversie: betaling voltooid
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "purchase", {
        event_category: "ecommerce",
        event_label: "schaderapport",
        value,
        currency: "EUR",
      })
      if (process.env.NEXT_PUBLIC_AW_ID && process.env.NEXT_PUBLIC_AW_CONVERSION) {
        ;(window as any).gtag("event", "conversion", {
          send_to: `${process.env.NEXT_PUBLIC_AW_ID}/${process.env.NEXT_PUBLIC_AW_CONVERSION}`,
          value,
          currency: "EUR",
        })
      }
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "var(--navy)" }}>
        <span className="text-white text-2xl font-black">✓</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Bedankt voor uw aanvraag</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        Uw betaling is ontvangen. Ons team beoordeelt uw aanvraag en u ontvangt uw officieel schaderapport
        (PDF) <strong>binnen 24 uur</strong> per e-mail.
      </p>
      <div className="border border-gray-200 p-6 text-left mb-8 bg-gray-50">
        <p className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Wat nu?</p>
        <ol className="text-gray-700 text-sm space-y-3">
          <li className="flex gap-3"><span className="font-black" style={{ color: "var(--navy)" }}>1.</span> Wij beoordelen uw aanvraag en de aangeleverde foto&apos;s</li>
          <li className="flex gap-3"><span className="font-black" style={{ color: "var(--navy)" }}>2.</span> U ontvangt het officiële PDF-rapport binnen 24 uur per e-mail</li>
          <li className="flex gap-3"><span className="font-black" style={{ color: "var(--navy)" }}>3.</span> Stuur het rapport op naar uw verzekeraar ter onderbouwing van uw claim</li>
        </ol>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        Vragen? Mail naar{" "}
        <a href="mailto:info@tvschaderapport.nl" className="hover:underline" style={{ color: "var(--navy)" }}>
          info@tvschaderapport.nl
        </a>
      </p>
      <Link href="/" className="font-semibold hover:underline" style={{ color: "var(--navy)" }}>
        ← Terug naar home
      </Link>
    </div>
  )
}
