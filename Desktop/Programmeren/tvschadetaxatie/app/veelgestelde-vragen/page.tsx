import type { Metadata } from "next"
import FAQ from "@/components/FAQ"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/veelgestelde-vragen"]

const faqItems = [
  {
    question: "Wat is een TV schaderapport en waarvoor gebruik ik het?",
    answer: "Een TV schaderapport is een officieel document waarin de schade aan uw televisie wordt vastgesteld, inclusief dagwaardeberekening en beoordeling van repareerbaarheid. Verzekeraars vragen dit bij het indienen van een schadeclaim.",
  },
  {
    question: "Accepteert mijn verzekeraar dit rapport?",
    answer: "Ja. Ons rapport is opgesteld conform de afschrijvingsrichtlijnen van het Verbond van Verzekeraars en wordt geaccepteerd door alle Nederlandse verzekeraars, waaronder Centraal Beheer, Interpolis, OHRA en Nationale-Nederlanden.",
  },
  {
    question: "Wanneer is een tv total loss?",
    answer: "Een televisie is total loss wanneer de reparatiekosten hoger zijn dan de dagwaarde. Bij schermschade is dit bijna altijd het geval.",
  },
  {
    question: "Hoe wordt de dagwaarde berekend?",
    answer: "De dagwaarde is de huidige nieuwwaarde van een vergelijkbaar model minus de afschrijving. Televisies schrijven 20% per jaar af conform de richtlijnen van het Verbond van Verzekeraars.",
  },
  {
    question: "Wat als ik de aankoopbon niet meer heb?",
    answer: "Geen probleem. We hanteren de huidige nieuwwaarde van een vergelijkbaar model als basis voor de berekening, zoals vermeld op Coolblue.nl of Tweakers.net.",
  },
  {
    question: "Hoe snel ontvang ik mijn rapport?",
    answer: "Binnen 24 uur na uw betaling. Op werkdagen voor 14:00 ingediend, ontvangst vaak dezelfde dag.",
  },
  {
    question: "Kan ik de kosten van het rapport terugvragen?",
    answer: "Ja, in veel gevallen zijn de kosten verhaalbaar. Bij aansprakelijkheidsschade (iemand anders heeft de tv kapot gemaakt) zijn de rapportkosten doorgaans volledig verhaalbaar.",
  },
  {
    question: "Voor welke televisiemerken stellen jullie rapporten op?",
    answer: "Voor alle merken: Samsung, LG, Philips, Sony, Panasonic, TCL, Hisense, Sharp, Loewe, en alle andere merken.",
  },
  {
    question: "Dekt mijn inboedelverzekering schermschade?",
    answer: "Dit hangt af van uw polis. Accidentele schade (vallen, stoten) is gedekt bij een all-risk polis. Bliksemschade is bij vrijwel alle inboedelverzekeringen gedekt.",
  },
  {
    question: "Wat is het verschil tussen een schaderapport en een total-loss verklaring?",
    answer: "Een total-loss verklaring is een schaderapport waarbij de conclusie is dat reparatie economisch niet verantwoord is. Wij stellen in het rapport het oordeel vast — dat kan repareerbaar of total loss zijn.",
  },
  {
    question: "Kan ik ook een rapport aanvragen voor een tv ouder dan 10 jaar?",
    answer: "Ja. Voor televisies ouder dan 5 jaar hanteren wij een maximale afschrijving van 80%, wat betekent dat de dagwaarde minimaal 20% van de oorspronkelijke nieuwwaarde bedraagt.",
  },
  {
    question: "Hoe betaal ik?",
    answer: "Via iDEAL of creditcard, veilig verwerkt via Mollie. U betaalt direct na het invullen van het formulier.",
  },
]

export default function FAQPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Veelgestelde Vragen", url: "https://tvschaderapport.nl/veelgestelde-vragen" },
  ])
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [breadcrumbSchema, faqSchema] }) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Veelgestelde vragen" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Veelgestelde vragen</h1>
        <p className="text-xl text-gray-600 mb-10">
          Alles over TV schadetaxatie, schaderapport aanvragen en vergoeding bij uw verzekeraar.
        </p>
        <FAQ items={faqItems} />
      </div>

      <CTASection />
    </>
  )
}
