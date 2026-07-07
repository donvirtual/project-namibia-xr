import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-scherm-gebroken-verzekering"]

export default function SchermGebrokenPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Scherm Gebroken Verzekering", url: "https://tvschaderapport.nl/tv-scherm-gebroken-verzekering" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Scherm Gebroken Verzekering" }]} />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Scherm Gebroken — Verzekering Claimen
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Uw TV-scherm is gebroken en u wilt dit claimen bij uw verzekering? U heeft een officieel schaderapport
          nodig. Wij stellen dit op — inclusief reparatiekostenanalyse en total-loss oordeel. v.a. €49, binnen 24 uur.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dekt mijn verzekering een gebroken TV scherm?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Of uw verzekering een gebroken scherm dekt hangt af van de oorzaak en uw polis:
        </p>
        <ul className="space-y-4 mb-8">
          <li className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-1">✓ Derde partij aansprakelijkheid</p>
            <p className="text-green-800 text-sm">Iemand anders heeft uw tv kapot gemaakt? Dan kunt u claimen via hun aansprakelijkheidsverzekering. De rapportkosten zijn dan ook verhaalbaar.</p>
          </li>
          <li className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-1">✓ Inboedelverzekering (bij val of stoot)</p>
            <p className="text-green-800 text-sm">Als de tv is gevallen of omgestoten, kan dit onder de inboedelverzekering vallen als u &apos;onverwachte schade&apos; of &apos;alrisk&apos; dekking heeft.</p>
          </li>
          <li className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="font-semibold text-yellow-900 mb-1">⚠ Controleer uw polisblad</p>
            <p className="text-yellow-800 text-sm">Niet alle standaard inboedelverzekeringen dekken accidentele schade. Een all-risk of uitgebreide polis is doorgaans wel dekkend.</p>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Is een gebroken TV scherm altijd total loss?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bijna altijd. Vervanging van het LCD- of OLED-paneel overschrijdt in de meeste gevallen
          de dagwaarde van de televisie — zeker bij toestellen ouder dan 2-3 jaar.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In ons rapport stellen wij de dagwaarde vast én schatten wij de reparatiekosten. Als de
          reparatiekosten hoger zijn, verklaren wij de tv als total loss — wat doorgaans gunstiger is voor
          de uitkering dan een reparatievergoeding.
        </p>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-sky-900 mb-2">Wat wij voor u regelen</p>
          <ul className="text-sky-800 text-sm space-y-1">
            <li>✓ Officieel schaderapport op basis van uw foto&apos;s en beschrijving</li>
            <li>✓ Dagwaardeberekening conform Verbond van Verzekeraars</li>
            <li>✓ Reparatiekosteninschatting</li>
            <li>✓ Total-loss oordeel (indien van toepassing)</li>
            <li>✓ PDF binnen 24 uur per e-mail</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
          <Link href="/tv-schaderapport-verzekeraar" className="text-sky-700 hover:underline text-sm">Schaderapport verzekeraar</Link>
          <Link href="/dagwaarde-televisie-berekenen" className="text-sky-700 hover:underline text-sm">Dagwaarde berekenen</Link>
        </div>
      </div>

      <CTASection />
    </>
  )
}
