"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { AB_COOKIE, AB_VARIANTS, getVariant } from "@/lib/abtest"

const included = [
  "Apparaatgegevens (merk, model, bouwjaar)",
  "Vastgestelde dagwaarde (conform officiële afschrijvingstabellen)",
  "Beoordeling: repareerbaar of total loss",
  "Indicatie reparatiekosten (indien van toepassing)",
  "Fotodocumentatie van de schade",
  "Ondertekening en rapportnummer",
]

export default function PriceCard() {
  const [price, setPrice] = useState("49")

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${AB_COOKIE}=([^;]*)`))
    setPrice(AB_VARIANTS[getVariant(match?.[1])].price)
  }, [])

  return (
    <div className="border-2 max-w-md mx-auto" style={{ borderColor: "var(--navy)" }}>
      <div style={{ backgroundColor: "var(--navy)" }} className="p-6 text-center">
        <p className="text-white text-sm font-semibold uppercase tracking-widest mb-1">Officieel schaderapport</p>
        <p className="text-white text-6xl font-black tracking-tight">€{price}</p>
        <p className="text-blue-200 mt-1 text-sm">incl. BTW — eenmalig</p>
      </div>
      <div className="p-6 bg-white">
        <ul className="space-y-3 mb-6">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
              <span style={{ color: "var(--navy)" }} className="font-bold mt-0.5 shrink-0">▪</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mb-5 border-t border-gray-100 pt-4">
          Kosten in veel gevallen verhaalbaar op uw verzekeraar
        </p>
        <Link
          href="/aanvragen"
          className="block w-full text-center font-bold py-3 text-lg transition-colors hover:opacity-90 text-white"
          style={{ backgroundColor: "var(--navy)" }}
        >
          Rapport aanvragen — €{price} →
        </Link>
      </div>
    </div>
  )
}
