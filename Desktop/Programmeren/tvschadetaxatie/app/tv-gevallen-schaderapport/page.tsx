import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-gevallen-schaderapport"]

export default function TvGevallenPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Gevallen Schaderapport", url: "https://tvschaderapport.nl/tv-gevallen-schaderapport" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Gevallen Schaderapport" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Gevallen — Officieel Schaderapport voor Verzekeraar
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Uw televisie is gevallen en beschadigd? U heeft een officieel schaderapport nodig om te claimen bij
          uw verzekeraar. Wij stellen dit op — inclusief dagwaardeberekening en total-loss oordeel. Binnen 24 uur.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mijn TV is gevallen — wat nu?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Een televisie die van de muur, standaard of meubel valt is een van de meest voorkomende oorzaken
          van TV-schade in Nederland. In de meeste gevallen is het scherm gebroken of beschadigd. De stappen zijn:
        </p>
        <ol className="space-y-3 mb-8 list-none">
          {[
            "Maak foto's van de schade (minimaal 4: voorkant, achterkant, close-up schade, typeplaatje)",
            "Controleer uw verzekeringspolis (inboedelverzekering, reisverzekering of aansprakelijkheid van de veroorzaker)",
            "Vraag een officieel schaderapport aan via tvschaderapport.nl",
            "Dien het rapport in bij uw verzekeraar als onderbouwing van uw claim",
          ].map((stap, i) => (
            <li key={i} className="flex items-start gap-4 p-4 border border-gray-200 bg-gray-50">
              <span className="font-black text-lg shrink-0" style={{ color: "var(--navy)" }}>{i + 1}</span>
              <span className="text-gray-700">{stap}</span>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dekt mijn verzekering een gevallen TV?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Of uw verzekering de schade dekt, hangt af van de oorzaak en uw polisvoorwaarden:
        </p>
        <ul className="space-y-3 mb-8">
          <li className="border border-green-200 bg-green-50 p-4">
            <p className="font-semibold text-green-900 mb-1">Inboedelverzekering (all-risk)</p>
            <p className="text-green-800 text-sm">Valt uw TV onder een all-risk inboedelverzekering, dan is valschade doorgaans gedekt. U heeft een schaderapport nodig als bewijs.</p>
          </li>
          <li className="border border-green-200 bg-green-50 p-4">
            <p className="font-semibold text-green-900 mb-1">Aansprakelijkheidsverzekering (derde)</p>
            <p className="text-green-800 text-sm">Heeft iemand anders uw TV laten vallen? Dan kunt u claimen via zijn of haar aansprakelijkheidsverzekering. Ons rapport is hiervoor vereist.</p>
          </li>
          <li className="border border-yellow-200 bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-900 mb-1">Standaard inboedelverzekering (basis)</p>
            <p className="text-yellow-800 text-sm">Een basisverzekering dekt vaak geen valschade. Controleer uw polisblad op &apos;onverwachte schade&apos; of &apos;accidentele schade&apos; dekking.</p>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Is een gevallen TV altijd total loss?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bijna altijd. Vervanging van het LCD- of OLED-paneel overschrijdt in de meeste gevallen de dagwaarde
          van de televisie — zeker bij toestellen ouder dan 2–3 jaar.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Ons rapport stelt de dagwaarde vast én schat de reparatiekosten. Als reparatie economisch niet
          verantwoord is, verklaren wij de TV als total loss. Dit is doorgaans gunstiger voor uw uitkering.
        </p>

        <TrustBadges />

        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/tv-scherm-gebroken-verzekering" className="text-sky-700 hover:underline text-sm">Gebroken scherm</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
          <Link href="/inboedelverzekering-tv-schade" className="text-sky-700 hover:underline text-sm">Inboedelverzekering TV</Link>
          <Link href="/dagwaarde-televisie-berekenen" className="text-sky-700 hover:underline text-sm">Dagwaarde berekenen</Link>
        </div>
      </div>
      <CTASection title="TV Gevallen? Officieel Rapport binnen 24 uur" />
    </>
  )
}
