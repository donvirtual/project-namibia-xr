import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import FAQ from "@/components/FAQ"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-bliksemschade"]

const faq = [
  {
    question: "Wordt bliksemschade aan mijn tv vergoed door mijn verzekering?",
    answer:
      "Ja, bliksemschade valt in vrijwel alle gevallen onder de inboedelverzekering. Blikseminslagen worden behandeld als 'plotselinge en onvoorziene schade' en zijn bij de meeste polissen gedekt. Controleer uw polisblad voor de exacte voorwaarden.",
  },
  {
    question: "Hoe weet ik of mijn tv kapot is door bliksem?",
    answer:
      "Typische symptomen van bliksemschade: de tv doet het na een onweersbui plots niet meer, er is een brandgeur, de tv maakt een knal gehad, of meerdere apparaten op hetzelfde netwerk zijn tegelijk kapotgegaan.",
  },
  {
    question: "Heeft mijn verzekeraar het originele rapport nodig?",
    answer:
      "Nee, het PDF-rapport dat wij per e-mail sturen is geldig als bewijs voor uw verzekeraar. U hoeft niets per post te versturen.",
  },
  {
    question: "Wat als mijn tv via de antenne geraakt is door bliksem?",
    answer:
      "Bliksem kan via de antennekabel binnendringen en inwendige schade veroorzaken zonder dat dit zichtbaar is aan de buitenkant. Wij beoordelen de schade op basis van uw omschrijving en de omstandigheden, en leggen dit vast in het rapport.",
  },
]

export default function BliksemschadePage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Bliksemschade", url: "https://tvschaderapport.nl/tv-bliksemschade" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Bliksemschade" }]} />

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Bliksemschade — Schaderapport voor Verzekeraar
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Uw televisie kapot door blikseminslag? Bliksemschade valt in de meeste gevallen volledig onder
          uw inboedelverzekering. Wij stellen het officiële schaderapport op dat uw verzekeraar nodig heeft.
          v.a. €30, binnen 24 uur per e-mail.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-10">
          <p className="font-semibold text-yellow-900 mb-1">⚡ Bliksemschade = bijna altijd gedekt</p>
          <p className="text-yellow-800 text-sm leading-relaxed">
            Bliksemschade valt bij vrijwel alle Nederlandse inboedelverzekeringen onder de dekking voor
            &lsquo;plotselinge en onvoorziene schade&rsquo;. U hoeft doorgaans geen eigen risico te betalen voor bliksemschade.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wordt bliksemschade vergoed door mijn verzekering?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bliksemschade aan uw televisie is in de meeste gevallen gedekt door uw <strong>inboedelverzekering</strong>.
          Verzekeraars behandelen blikseminslagen als een plotselinge en onvoorziene gebeurtenis — een van de
          kerndekkingen van vrijwel elke inboedelpolis.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Ook indirecte bliksemschade — waarbij de schade niet direct door de inslag maar via de
          stroomtoevoer of antennekabel wordt veroorzaakt — is bij de meeste polissen gedekt. Controleer uw
          polisblad voor de exacte voorwaarden van uw verzekeraar.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welke schade kan bliksem aan een tv veroorzaken?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bliksem kan uw televisie op twee manieren beschadigen:
        </p>
        <ul className="space-y-3 mb-8 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="font-bold text-sky-700 shrink-0">1.</span>
            <span><strong>Directe blikseminslag:</strong> Een bliksemschicht raakt de antenne of schotelantenne en de stroom gaat via de kabel uw televisie in. Dit veroorzaakt vrijwel altijd totale schade aan de interne elektronica.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-sky-700 shrink-0">2.</span>
            <span><strong>Indirecte bliksemschade (spanningspiek):</strong> Een blikseminslag in de buurt veroorzaakt een spanning in het elektriciteitsnet, die via het stopcontact uw televisie beschadigt. Dit is de meest voorkomende oorzaak.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat moet ik doen bij bliksemschade aan mijn tv?</h2>
        <ol className="list-decimal ml-5 space-y-3 text-gray-700 mb-8">
          <li>Haal de stekker uit het stopcontact om verdere schade te voorkomen</li>
          <li>Maak foto&apos;s van de televisie en eventuele brandsporen of schade aan het snoer</li>
          <li>Noteer de datum en het tijdstip van de blikseminslag</li>
          <li>Vraag een officieel schaderapport aan via tvschaderapport.nl</li>
          <li>Dien het rapport in bij uw inboedelverzekering</li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hoe vraag ik het schaderapport aan?</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Vul ons formulier in met de gegevens van uw televisie, omschrijf de omstandigheden van de
          blikseminslag, upload foto&apos;s van het toestel en betaal veilig v.a. €30 via iDEAL. Binnen 24 uur
          ontvangt u het officiële schaderapport per e-mail — klaar om in te dienen bij uw verzekeraar.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Veelgestelde vragen over TV bliksemschade</h2>
        <FAQ items={faq} />

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-4">Gerelateerde informatie:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">
              TV Total Loss Verklaring
            </Link>
            <Link href="/dagwaarde-televisie-berekenen" className="text-sky-700 hover:underline text-sm">
              Dagwaarde televisie berekenen
            </Link>
            <Link href="/tv-schaderapport-verzekeraar" className="text-sky-700 hover:underline text-sm">
              Schaderapport voor verzekeraar
            </Link>
          </div>
        </div>
      </div>

      <CTASection
        title="Bliksemschade aan uw TV? Wij stellen het rapport op."
        subtitle="Binnen 5 minuten ingediend, rapport binnen 24 uur per e-mail."
      />
    </>
  )
}
