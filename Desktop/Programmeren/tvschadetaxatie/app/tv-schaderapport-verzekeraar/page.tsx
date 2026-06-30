import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-schaderapport-verzekeraar"]

export default function SchaderapportVerzekeraarsPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Schaderapport Verzekeraar", url: "https://tvschaderapport.nl/tv-schaderapport-verzekeraar" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Schaderapport voor Verzekeraar" }]} />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schaderapport voor Verzekeraar — Officieel &amp; Snel
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Heeft uw verzekeraar een officieel schaderapport nodig voor uw beschadigde televisie? Wij stellen
          het op. Conform de richtlijnen van het Verbond van Verzekeraars, inclusief dagwaardeberekening en
          schade-oordeel. v.a. €30, binnen 24 uur per e-mail.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Waarom heeft mijn verzekeraar een schaderapport nodig?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Verzekeraars vragen bij schade aan elektronica een officieel taxatierapport om de hoogte van de
          schadevergoeding te kunnen vaststellen. Zonder rapport kan uw verzekeraar uw claim niet verwerken
          of afwijzen vanwege onvoldoende onderbouwing.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Ons rapport bevat alle informatie die verzekeraars nodig hebben: een objectieve dagwaardeberekening,
          een beoordeling van de schade, fotodocumentatie en een oordeel over repareerbaarheid.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welke verzekeraars accepteren uw rapport?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Ons schaderapport wordt geaccepteerd door alle Nederlandse verzekeraars, waaronder:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {["Centraal Beheer", "Interpolis", "OHRA", "Nationale-Nederlanden", "Aegon", "ASR", "Univé", "InShared", "Ditzo"].map((v) => (
            <div key={v} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
              <span className="text-green-600">✓</span> {v}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat staat er in het schaderapport?</h2>
        <ul className="space-y-3 mb-8">
          {[
            "Apparaatgegevens: merk, model, aanschafjaar en aankoopprijs",
            "Huidige nieuwwaarde van een vergelijkbaar model",
            "Dagwaardeberekening conform Verbond van Verzekeraars (20% afschrijving per jaar)",
            "Schade-oordeel: repareerbaar of total loss",
            "Toelichting bij het oordeel",
            "Fotodocumentatie van de schade",
            "Officieel rapportnummer en datum",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-10">
          <p className="font-bold text-sky-900 text-lg mb-2">v.a. €30 — Binnen 24 uur geleverd</p>
          <p className="text-sky-800 text-sm leading-relaxed">
            Na uw betaling beoordelen wij uw aanvraag en foto&apos;s. U ontvangt het PDF-rapport binnen 24 uur op
            uw e-mailadres. Kosten zijn in veel gevallen verhaalbaar op uw verzekeraar of de veroorzaker.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
          <Link href="/tv-bliksemschade" className="text-sky-700 hover:underline text-sm">Bliksemschade</Link>
          <Link href="/dagwaarde-televisie-berekenen" className="text-sky-700 hover:underline text-sm">Dagwaarde berekenen</Link>
        </div>
      </div>

      <CTASection />
    </>
  )
}
