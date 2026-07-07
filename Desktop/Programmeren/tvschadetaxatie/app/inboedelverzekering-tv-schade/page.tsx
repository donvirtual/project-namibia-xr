import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/inboedelverzekering-tv-schade"]

export default function InboedelPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Inboedelverzekering TV Schade", url: "https://tvschaderapport.nl/inboedelverzekering-tv-schade" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Inboedelverzekering TV Schade" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schade Claimen via Inboedelverzekering — Schaderapport vereist
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Uw televisie is beschadigd en u wilt dit claimen via uw inboedelverzekering? U heeft een officieel
          schaderapport nodig. Wij stellen dit op voor v.a. €49, binnen 24 uur per e-mail.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wanneer dekt de inboedelverzekering TV-schade?</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Niet elke inboedelverzekering dekt TV-schade op dezelfde manier. Dit is het overzicht:
        </p>
        <div className="space-y-0 border border-gray-200 mb-8">
          {[
            { type: "All-risk inboedelverzekering", dekt: "Alle onverwachte schade, inclusief valschade, stootschade en bliksemschade. Meest uitgebreid.", kleur: "green" },
            { type: "Uitgebreide inboedelverzekering", dekt: "Brand, water, storm, diefstal en bliksem. Valschade soms gedekt als optie.", kleur: "yellow" },
            { type: "Basis inboedelverzekering", dekt: "Alleen brand, water en storm. Valschade en stootschade zijn NIET gedekt.", kleur: "red" },
          ].map((row, i) => (
            <div key={i} className={`p-5 border-b border-gray-200 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
              <p className="font-semibold text-gray-900 mb-1">{row.type}</p>
              <p className="text-gray-600 text-sm">{row.dekt}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat heeft u nodig voor een TV-schade claim?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          De meeste verzekeraars vragen bij een TV-schade claim om een officieel schaderapport. Dit rapport
          moet bevatten:
        </p>
        <ul className="space-y-2 mb-8">
          {[
            "Apparaatgegevens: merk, model, serienummer en aanschafjaar",
            "Oorzaak van de schade (val, stoot, bliksem etc.)",
            "Vastgestelde dagwaarde op basis van officiële afschrijvingstabellen",
            "Beoordeling: repareerbaar of total loss",
            "Fotodocumentatie van de schade",
            "Officieel rapportnummer",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 py-2 border-b border-gray-100">
              <span className="font-black shrink-0" style={{ color: "var(--navy)" }}>▪</span>
              <span className="text-gray-700 text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vergoeding inboedelverzekering TV</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bij een goedgekeurde claim vergoedt uw verzekeraar in de meeste gevallen de <strong>dagwaarde</strong> van
          uw televisie. Dit is de nieuwwaarde minus afschrijving op basis van leeftijd. Een TV van 3 jaar oud
          met een nieuwwaarde van €800 heeft bijvoorbeeld een dagwaarde van circa €320.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Ons rapport berekent de dagwaarde conform de afschrijvingsrichtlijnen van het Verbond van Verzekeraars,
          waardoor uw verzekeraar het direct kan verwerken.
        </p>

        <TrustBadges />

        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/dagwaarde-televisie-berekenen" className="text-sky-700 hover:underline text-sm">Dagwaarde berekenen</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
          <Link href="/tv-gevallen-schaderapport" className="text-sky-700 hover:underline text-sm">TV gevallen</Link>
          <Link href="/tv-scherm-gebroken-verzekering" className="text-sky-700 hover:underline text-sm">Scherm gebroken</Link>
        </div>
      </div>
      <CTASection title="TV Schade Claimen via Inboedelverzekering?" />
    </>
  )
}
