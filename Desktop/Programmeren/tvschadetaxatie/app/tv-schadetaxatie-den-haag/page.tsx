import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-schadetaxatie-den-haag"]

export default function DenHaagPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Schadetaxatie Den Haag", url: "https://tvschaderapport.nl/tv-schadetaxatie-den-haag" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Schadetaxatie Den Haag" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schadetaxatie Den Haag — Schaderapport binnen 24 uur
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          TV beschadigd in Den Haag? Online TV schadetaxatie zonder taxateur aan huis. Officieel
          schaderapport voor uw verzekeraar. v.a. €30, binnen 24 uur per e-mail.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          In Den Haag — van Centrum tot Scheveningen, van Laak tot Escamp — kunt u eenvoudig een
          officieel TV schaderapport aanvragen via onze online dienst. Geen bezoek aan huis nodig,
          geen lange wachttijden.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Uw TV schadetaxatie in Den Haag verloopt volledig digitaal. Upload uw foto&apos;s, vul het formulier
          in en betaal veilig v.a. €30 via iDEAL. Binnen 24 uur ontvangt u het officiële PDF-rapport dat uw
          verzekeraar nodig heeft voor de schadeclaim.
        </p>
        <TrustBadges />
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/tv-schadetaxatie-amsterdam" className="text-sky-700 hover:underline text-sm">Amsterdam</Link>
          <Link href="/tv-schadetaxatie-rotterdam" className="text-sky-700 hover:underline text-sm">Rotterdam</Link>
          <Link href="/tv-schadetaxatie-utrecht" className="text-sky-700 hover:underline text-sm">Utrecht</Link>
          <Link href="/tv-schadetaxatie-eindhoven" className="text-sky-700 hover:underline text-sm">Eindhoven</Link>
        </div>
      </div>
      <CTASection title="TV Schadetaxatie Den Haag — Rapport binnen 24 uur" />
    </>
  )
}
