import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/dagwaarde-televisie-berekenen"]

const examples = [
  { jaar: 1, nieuw: 800, dagwaarde: 640 },
  { jaar: 2, nieuw: 800, dagwaarde: 480 },
  { jaar: 3, nieuw: 800, dagwaarde: 320 },
  { jaar: 5, nieuw: 800, dagwaarde: 160 },
]

export default function DagwaardePage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Dagwaarde Televisie Berekenen", url: "https://tvschaderapport.nl/dagwaarde-televisie-berekenen" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Dagwaarde Televisie Berekenen" }]} />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Dagwaarde Televisie Berekenen — Officiële Methode
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          De dagwaarde van uw televisie is het bedrag dat uw verzekeraar uitkeert bij total loss. Wij berekenen
          de dagwaarde conform de officiële afschrijvingsrichtlijnen van het Verbond van Verzekeraars. v.a. €49,
          binnen 24 uur inclusief volledig rapport.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hoe wordt de dagwaarde berekend?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          De dagwaarde is de <strong>huidige nieuwwaarde</strong> van een vergelijkbaar model minus de
          <strong> afschrijving</strong> op basis van ouderdom. Voor televisies hanteert het Verbond van
          Verzekeraars een afschrijving van <strong>20% per jaar</strong>.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 font-mono text-sm mb-6">
          <p className="font-bold mb-2">Formule:</p>
          <p>Dagwaarde = Nieuwwaarde × (1 - 0,20 × aantal jaren)</p>
          <p className="mt-2 text-gray-500">Maximum afschrijving: 80% (dagwaarde nooit lager dan 20% van nieuwwaarde)</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Voorbeeldberekeningen</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">Leeftijd</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Nieuwwaarde</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Afschrijving</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-bold">Dagwaarde</th>
              </tr>
            </thead>
            <tbody>
              {examples.map((e) => (
                <tr key={e.jaar}>
                  <td className="border border-gray-200 px-4 py-2">{e.jaar} jaar</td>
                  <td className="border border-gray-200 px-4 py-2">€{e.nieuw}</td>
                  <td className="border border-gray-200 px-4 py-2">{e.jaar * 20}%</td>
                  <td className="border border-gray-200 px-4 py-2 font-bold text-sky-700">€{e.dagwaarde}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat als ik de aankoopbon niet heb?</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          Geen probleem. Wij hanteren de <strong>huidige nieuwwaarde</strong> van een vergelijkbaar model als
          basis — niet de oorspronkelijke aankoopprijs. We raadplegen hiervoor actuele prijslijsten van
          Coolblue.nl en Tweakers.net. Dit is conform de gangbare praktijk bij verzekeraars en werkt
          doorgaans in uw voordeel als de prijzen van televisies gedaald zijn.
        </p>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-sky-900 mb-2">Wij berekenen de dagwaarde voor u</p>
          <p className="text-sky-800 text-sm leading-relaxed">
            Voor v.a. €49 stellen wij een volledig officieel rapport op met de dagwaardeberekening, schade-oordeel
            en alle informatie die uw verzekeraar nodig heeft. U hoeft zelf niets te berekenen.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
          <Link href="/tv-schaderapport-verzekeraar" className="text-sky-700 hover:underline text-sm">Schaderapport verzekeraar</Link>
          <Link href="/tv-bliksemschade" className="text-sky-700 hover:underline text-sm">Bliksemschade</Link>
        </div>
      </div>

      <CTASection />
    </>
  )
}
