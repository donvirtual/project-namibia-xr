import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import FAQ from "@/components/FAQ"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-total-loss-verklaring"]

const faq = [
  {
    question: "Wanneer is mijn televisie officieel total loss?",
    answer:
      "Uw televisie is total loss wanneer de reparatiekosten de dagwaarde overschrijden. Bij schermschade is dit bijna altijd het geval: een vervangend scherm kost €300-600, terwijl een vergelijkbare nieuwe tv vaak hetzelfde kost.",
  },
  {
    question: "Accepteert mijn verzekeraar een total-loss verklaring van tvschaderapport.nl?",
    answer:
      "Ja. Onze verklaringen zijn conform de afschrijvingsrichtlijnen van het Verbond van Verzekeraars en worden geaccepteerd door alle Nederlandse verzekeraars, waaronder Centraal Beheer, Interpolis, OHRA en Nationale-Nederlanden.",
  },
  {
    question: "Hoe snel ontvang ik de total-loss verklaring?",
    answer: "Binnen 24 uur na uw betaling. Op werkdagen voor 14:00 ingediend, ontvangst vaak dezelfde dag.",
  },
]

export default function TotalLossPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "TV Total Loss Verklaring" },
  ]
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Total Loss Verklaring", url: "https://tvschaderapport.nl/tv-total-loss-verklaring" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={crumbs} />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Total Loss Verklaring voor Verzekeraar
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Is uw televisie total loss verklaard? Wij stellen de officiële total-loss verklaring op die uw
          verzekeraar nodig heeft om de schadevergoeding uit te keren. Binnen 24 uur per e-mail, voor slechts v.a. €30.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-10 flex items-start gap-3">
          <span className="text-green-600 font-bold mt-0.5">✓</span>
          <p className="text-green-800 text-sm leading-relaxed">
            Geaccepteerd bij Centraal Beheer, Interpolis, OHRA, Nationale-Nederlanden en alle andere verzekeraars.
            Conform afschrijvingsrichtlijnen Verbond van Verzekeraars.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">Wanneer is uw televisie total loss?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Een televisie wordt als total loss beschouwd wanneer de reparatiekosten hoger zijn dan de dagwaarde
          van het toestel. De dagwaarde is de nieuwwaarde minus de afschrijving op basis van ouderdom.
          Televisies schrijven gemiddeld 20% per jaar af volgens de richtlijnen van het Verbond van Verzekeraars.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          In de praktijk is een televisie bij schermschade bijna altijd total loss. Een vervangend LCD- of
          OLED-paneel kost doorgaans €300 tot €600, terwijl een vergelijkbaar nieuw toestel voor dezelfde
          prijs beschikbaar is. Bij bliksemschade of inwendige schade kan dit anders liggen: dan beoordelen
          wij of reparatie economisch zinvol is.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hoe verloopt de aanvraag?</h2>
        <ol className="list-decimal ml-5 space-y-3 text-gray-700 mb-8">
          <li>U vult het formulier in met uw televisiegegevens en een omschrijving van de schade</li>
          <li>U uploadt minimaal 2 foto&apos;s van de schade en het typeplaatje</li>
          <li>U betaalt veilig v.a. €30 via iDEAL of creditcard</li>
          <li>Wij beoordelen de schade en stellen de officiële total-loss verklaring op</li>
          <li>U ontvangt de PDF binnen 24 uur per e-mail</li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat staat er in de total-loss verklaring?</h2>
        <ul className="space-y-3 mb-8">
          {[
            "Apparaatgegevens: merk, model, serienummer en aanschafjaar",
            "Dagwaardeberekening conform officiële afschrijvingstabellen (20% per jaar)",
            "Oordeel: total loss of repareerbaar",
            "Motivering van het total-loss oordeel",
            "Fotodocumentatie van de vastgestelde schade",
            "Ondertekening en uniek rapportnummer",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dagwaardeberekening uitgelegd</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          De dagwaarde berekenen wij conform de afschrijvingstabellen die het Verbond van Verzekeraars
          hanteert voor consumentenelektronica. Televisies schrijven 20% per jaar af. Dat betekent:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 font-mono text-sm mb-8">
          <p>Nieuwwaarde: €800</p>
          <p>Afschrijving per jaar: 20%</p>
          <p>Leeftijd: 3 jaar → 60% afschrijving</p>
          <p className="font-bold mt-2">Dagwaarde = €800 × 40% = €320</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Veelgestelde vragen</h2>
        <FAQ items={faq} />

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-4">Gerelateerde informatie:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dagwaarde-televisie-berekenen" className="text-sky-700 hover:underline text-sm">
              Dagwaarde televisie berekenen
            </Link>
            <Link href="/tv-bliksemschade" className="text-sky-700 hover:underline text-sm">
              TV bliksemschade rapport
            </Link>
            <Link href="/tv-schaderapport-verzekeraar" className="text-sky-700 hover:underline text-sm">
              Schaderapport voor verzekeraar
            </Link>
          </div>
        </div>
      </div>

      <CTASection
        title="Vraag uw total-loss verklaring aan"
        subtitle="Binnen 5 minuten ingediend, rapport binnen 24 uur in uw mailbox."
      />
    </>
  )
}
