"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { AB_COOKIE, AB_VARIANTS, getVariant } from "@/lib/abtest"

interface CTASectionProps {
  title?: string
  subtitle?: string
}

export default function CTASection({
  title = "Klaar om uw schaderapport aan te vragen?",
  subtitle = "Binnen 5 minuten ingediend. Rapport binnen 24 uur in uw mailbox.",
}: CTASectionProps) {
  const [price, setPrice] = useState("49")

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${AB_COOKIE}=([^;]*)`))
    setPrice(AB_VARIANTS[getVariant(match?.[1])].price)
  }, [])

  return (
    <section style={{ backgroundColor: "var(--navy)" }} className="py-16 mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-blue-100 text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/aanvragen"
            className="bg-white font-bold px-8 py-4 text-lg transition-colors hover:bg-blue-50"
            style={{ color: "var(--navy)" }}
          >
            Rapport aanvragen — €{price} →
          </Link>
          <Link
            href="/veelgestelde-vragen"
            className="border border-white text-white font-semibold px-8 py-4 text-lg transition-colors hover:bg-white/10"
          >
            Veelgestelde vragen
          </Link>
        </div>
        <p className="text-blue-200 text-sm mt-6">Kosten in veel gevallen verhaalbaar op uw verzekeraar</p>
      </div>
    </section>
  )
}
