import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-schadetaxatie-eindhoven"]

export default function EindhovenPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Schadetaxatie Eindhoven", url: "https://tvschaderapport.nl/tv-schadetaxatie-eindhoven" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Schadetaxatie Eindhoven" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schadetaxatie Eindhoven — Schaderapport binnen 24 uur
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          TV beschadigd in Eindhoven? Online TV schadetaxatie, geen bezoek nodig. Officieel schaderapport
          voor uw verzekeraar. v.a. €30, binnen 24 uur per e-mail.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          In Eindhoven kunt u voor een professionele TV schadetaxatie terecht bij tvschaderapport.nl.
          Onze volledig online dienst maakt het mogelijk om vanuit Eindhoven — van Stratum tot Woensel,
          van Strijp tot Tongelre — eenvoudig een officieel schaderapport aan te vragen.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Na uw aanvraag ontvangt u binnen 24 uur een officieel schaderapport per e-mail. Dit rapport
          is volledig geaccepteerd door alle verzekeraars die actief zijn in Eindhoven en heel Nederland.
          TV schadetaxatie in Eindhoven was nog nooit zo eenvoudig.
        </p>
        <TrustBadges />
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/tv-schadetaxatie-amsterdam" className="text-sky-700 hover:underline text-sm">Amsterdam</Link>
          <Link href="/tv-schadetaxatie-rotterdam" className="text-sky-700 hover:underline text-sm">Rotterdam</Link>
          <Link href="/tv-schadetaxatie-den-haag" className="text-sky-700 hover:underline text-sm">Den Haag</Link>
          <Link href="/tv-schadetaxatie-utrecht" className="text-sky-700 hover:underline text-sm">Utrecht</Link>
        </div>
      </div>
      <CTASection title="TV Schadetaxatie Eindhoven — Rapport binnen 24 uur" />
    </>
  )
}
