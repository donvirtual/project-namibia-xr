import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-schadetaxatie-rotterdam"]

export default function RotterdamPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Schadetaxatie Rotterdam", url: "https://tvschaderapport.nl/tv-schadetaxatie-rotterdam" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Schadetaxatie Rotterdam" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schadetaxatie Rotterdam — Schaderapport binnen 24 uur
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          TV beschadigd in Rotterdam? Volledig online TV schadetaxatie in Rotterdam — geen taxateur aan huis
          nodig. Upload uw foto&apos;s en ontvang uw officieel schaderapport binnen 24 uur. v.a. €30.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Rotterdammers kunnen eenvoudig en snel gebruik maken van onze online TV schadetaxatie dienst.
          Of u nu woont in Centrum, Kralingen, Feijenoord of IJsselmonde — ons schaderapport is volledig
          online aan te vragen. Geen wachttijden voor een taxateur, geen gedoe.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Na uw aanvraag beoordelen wij de schade op basis van uw foto&apos;s en omschrijving. U ontvangt
          het officiële PDF-rapport binnen 24 uur per e-mail. Dit schaderapport wordt geaccepteerd door
          alle verzekeraars in Rotterdam en heel Nederland.
        </p>
        <TrustBadges />
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/tv-schadetaxatie-amsterdam" className="text-sky-700 hover:underline text-sm">Amsterdam</Link>
          <Link href="/tv-schadetaxatie-den-haag" className="text-sky-700 hover:underline text-sm">Den Haag</Link>
          <Link href="/tv-schadetaxatie-utrecht" className="text-sky-700 hover:underline text-sm">Utrecht</Link>
          <Link href="/tv-schadetaxatie-eindhoven" className="text-sky-700 hover:underline text-sm">Eindhoven</Link>
        </div>
      </div>
      <CTASection title="TV Schadetaxatie Rotterdam — Rapport binnen 24 uur" />
    </>
  )
}
