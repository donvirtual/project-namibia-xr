import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"
import TrustBadges from "@/components/TrustBadges"
import HowItWorks from "@/components/HowItWorks"
import PriceCard from "@/components/PriceCard"
import FAQ from "@/components/FAQ"
import CTASection from "@/components/CTASection"
import { generateLocalBusinessSchema, generateFAQSchema } from "@/lib/schema"
import { AB_COOKIE, AB_VARIANTS, getVariant } from "@/lib/abtest"

const faqItems = [
  {
    question: "Wat is een TV schaderapport en waarvoor gebruik ik het?",
    answer:
      "Een TV schaderapport (ook wel schadetaxatie of total-loss verklaring) is een officieel document waarin de schade aan uw televisie wordt vastgesteld. Het rapport beschrijft de aard van de schade, de dagwaarde van het toestel en geeft een oordeel over repareerbaarheid. Verzekeraars vragen dit document bij het indienen van een schadeclaim.",
  },
  {
    question: "Accepteert mijn verzekeraar dit rapport?",
    answer:
      "Ja. Ons rapport is opgesteld conform de afschrijvingsrichtlijnen van het Verbond van Verzekeraars en voldoet aan de eisen die Nederlandse verzekeraars stellen aan een schadetaxatie. Het rapport is geschikt voor inboedelverzekeringen, aansprakelijkheidsverzekeringen en reisverzekeringen.",
  },
  {
    question: "Wanneer is een tv total loss?",
    answer:
      "Een televisie wordt als total loss beschouwd wanneer de reparatiekosten hoger zijn dan de dagwaarde van het toestel. Bij schermschade is dit vaak het geval: een nieuw scherm kost doorgaans evenveel als een vergelijkbare nieuwe tv.",
  },
  {
    question: "Hoe wordt de dagwaarde berekend?",
    answer:
      "De dagwaarde is de nieuwwaarde van uw televisie minus de afschrijving op basis van leeftijd en gebruik. Televisies schrijven gemiddeld 20% per jaar af. Een tv van 3 jaar oud met een nieuwwaarde van €800 heeft dus een dagwaarde van circa €800 - 60% = €320.",
  },
  {
    question: "Wat als ik de aankoopbon niet meer heb?",
    answer:
      "Geen probleem. We hanteren dan de huidige nieuwwaarde van een vergelijkbaar model, zoals vermeld op Coolblue.nl of Tweakers.net, als basis voor de berekening.",
  },
  {
    question: "Hoe snel ontvang ik mijn rapport?",
    answer:
      "Binnen 24 uur na ontvangst van uw betaling. Op werkdagen voor 14:00 ingediend, ontvangst vaak dezelfde dag.",
  },
  {
    question: "Kan ik de kosten van het rapport terugvragen?",
    answer:
      "Ja, in veel gevallen zijn de kosten van het schaderapport verhaalbaar. Als de schade is veroorzaakt door een derde partij (via aansprakelijkheidsverzekering) zijn de rapportkosten doorgaans volledig verhaalbaar. Bij claims via de eigen inboedelverzekering is dit afhankelijk van de polisvoorwaarden.",
  },
  {
    question: "Voor welke televisiemerken stellen jullie rapporten op?",
    answer:
      "Voor alle merken: Samsung, LG, Philips, Sony, Panasonic, TCL, Hisense, Sharp, Loewe, en alle andere merken.",
  },
]

const scenarios = [
  {
    title: "Iemand anders maakte uw tv kapot",
    desc: "Buurman omgestoten, kind ertegen geslagen, feestje misgelopen. Claim via aansprakelijkheidsverzekering van de veroorzaker.",
  },
  {
    title: "Uw tv heeft schermschade of andere zichtbare schade",
    desc: "Gebroken scherm, deuk, vloeistofschade. Uw inboedel- of reisverzekering kan dit dekken.",
  },
  {
    title: "Uw tv is getroffen door bliksemschade",
    desc: "Blikseminslag via antenne of stopcontact. In de meeste gevallen volledig gedekt door uw inboedelverzekering.",
  },
]

const seoLinks = [
  { href: "/tv-total-loss-verklaring", label: "TV Total Loss Verklaring" },
  { href: "/tv-schaderapport-verzekeraar", label: "Rapport voor verzekeraar" },
  { href: "/tv-bliksemschade", label: "Bliksemschade schaderapport" },
  { href: "/dagwaarde-televisie-berekenen", label: "Dagwaarde berekenen" },
  { href: "/tv-scherm-gebroken-verzekering", label: "Gebroken scherm verzekering" },
  { href: "/samsung-tv-schaderapport", label: "Samsung TV rapport" },
  { href: "/lg-tv-schaderapport", label: "LG TV rapport" },
  { href: "/philips-tv-schaderapport", label: "Philips TV rapport" },
  { href: "/sony-tv-schaderapport", label: "Sony TV rapport" },
  { href: "/tv-schadetaxatie-amsterdam", label: "Amsterdam" },
  { href: "/tv-schadetaxatie-rotterdam", label: "Rotterdam" },
  { href: "/tv-schadetaxatie-den-haag", label: "Den Haag" },
  { href: "/tv-schadetaxatie-utrecht", label: "Utrecht" },
  { href: "/tv-schadetaxatie-eindhoven", label: "Eindhoven" },
]

export default async function HomePage() {
  const cookieStore = await cookies()
  const variant = getVariant(cookieStore.get(AB_COOKIE)?.value)
  const { price } = AB_VARIANTS[variant]

  const lbSchema = generateLocalBusinessSchema()
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [lbSchema, faqSchema] }),
        }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200 py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-6 border" style={{ borderColor: "var(--navy)", color: "var(--navy)" }}>
              TV-specialisten — 24/7 bereikbaar
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6" style={{ lineHeight: 1.1 }}>
              Officieel schaderapport voor uw televisie
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Beschadigde televisie claimen bij uw verzekeraar? Wij stellen een officieel schadetaxatierapport op.
              Inclusief dagwaardeberekening en total-loss oordeel. Binnen 24 uur per e-mail geleverd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/aanvragen"
                className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 text-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--navy)" }}
              >
                Rapport aanvragen — €{price} →
              </Link>
              <Link
                href="/hoe-het-werkt"
                className="inline-flex items-center justify-center gap-2 border-2 font-semibold px-8 py-4 text-lg transition-colors hover:bg-gray-50"
                style={{ borderColor: "var(--navy)", color: "var(--navy)" }}
              >
                Hoe werkt het?
              </Link>
            </div>
            <TrustBadges />
          </div>
          <div className="relative">
            <Image
              src="/technician.png"
              alt="TV specialist beoordeelt schade aan televisie — tvschaderapport.nl"
              width={520}
              height={620}
              className="w-full object-cover max-h-64 lg:max-h-none object-top lg:object-center"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4" style={{ backgroundColor: "var(--navy)" }}>
              <p className="text-white text-sm font-bold">Gecertificeerde TV-specialist</p>
              <p className="text-blue-200 text-xs mt-0.5">Rapport binnen 24 uur · kosten verhaalbaar op verzekeraar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wanneer heeft u dit nodig */}
      <section className="py-16 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wanneer heeft u dit nodig?</h2>
          <p className="text-gray-600 mb-10">In deze gevallen heeft u een officieel schaderapport nodig voor uw verzekeraar.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {scenarios.map((s, i) => (
              <div key={s.title} className={`bg-white p-6 ${i < scenarios.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""}`}>
                <div style={{ backgroundColor: "var(--navy-light)" }} className="w-10 h-10 flex items-center justify-center mb-4">
                  <span style={{ color: "var(--navy)" }} className="font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <HowItWorks />

      {/* Prijskaart */}
      <section className="py-16 px-4 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wat krijgt u van ons?</h2>
              <p className="text-gray-600 mb-8">Een volledig officieel schadetaxatierapport, direct bruikbaar voor uw verzekeraar.</p>
              <ul className="space-y-0 border border-gray-200">
                {[
                  "Apparaatgegevens (merk, model, bouwjaar)",
                  "Vastgestelde dagwaarde conform officiële afschrijvingstabellen",
                  "Beoordeling: repareerbaar of total loss",
                  "Indicatie reparatiekosten (indien van toepassing)",
                  "Fotodocumentatie van de schade",
                  "Officieel rapportnummer en ondertekening",
                ].map((item, i) => (
                  <li key={item} className={`flex items-start gap-4 px-5 py-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200 last:border-0`}>
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5 text-white text-xs font-bold" style={{ backgroundColor: "var(--navy)" }}>✓</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <PriceCard />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ervaringen van klanten</h2>
              <p className="text-gray-600">Wat anderen zeggen over tvschaderapport.nl</p>
            </div>
            <a
              href="https://nl.trustpilot.com/review/tvschaderapport.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 hover:border-gray-300 transition-colors shrink-0"
            >
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => <span key={n} className="text-green-500 text-lg">★</span>)}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Trustpilot</p>
                <p className="text-gray-500 text-xs">Bekijk alle reviews</p>
              </div>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {[
              { name: "Dennis", city: "Tilburg", text: "Mijn tv was gevallen. Via de mail snel contact gehad en duidelijke uitleg wat er in het rapport zou komen. Verzekeraar ging akkoord. Ben er blij mee." },
              { name: "Marjolein", city: "Haarlem", text: "Was een beetje bang dat de foto's die ik zelf maakte niet goed genoeg zouden zijn, maar dat was gewoon prima. Geen gedoe." },
              { name: "Bas", city: "Groningen", text: "Eerlijk gezegd had ik zoiets van 49 euro daarvoor? Maar mijn tv van 1400 euro is gewoon uitbetaald dus dan is het rekenen." },
            ].map((r, i) => (
              <div key={r.name} className={`bg-white p-6 ${i < 2 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""}`}>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(n => <span key={n} style={{ color: "var(--navy)" }} className="text-sm">★</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{r.name} — {r.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Veelgestelde vragen</h2>
          <p className="text-gray-600 mb-10">Antwoorden op de meest gestelde vragen over ons schaderapport.</p>
          <FAQ items={faqItems} />
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link href="/veelgestelde-vragen" className="font-semibold hover:underline" style={{ color: "var(--navy)" }}>
              Alle veelgestelde vragen bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* Meer informatie / SEO links */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-bold text-gray-700 mb-5 uppercase tracking-wide">Meer informatie</h2>
          <div className="flex flex-wrap gap-2">
            {seoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-gray-300 text-gray-700 text-sm px-4 py-2 bg-white transition-colors hover:border-blue-400 hover:text-blue-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
