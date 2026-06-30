import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-schadetaxatie-haarlem"]

export default function HaarlemPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Schadetaxatie Haarlem", url: "https://tvschaderapport.nl/tv-schadetaxatie-haarlem" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Schadetaxatie Haarlem" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schadetaxatie Haarlem — Schaderapport binnen 24 uur
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          TV beschadigd in  Online TV schadetaxatie, geen bezoek nodig. Officieel schaderapport
          voor uw verzekeraar. Binnen 24 uur per e-mail.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Bewoners van Haarlem kunnen voor een TV schadetaxatie volledig online terecht bij
          tvschaderapport.nl. Of uw televisie nu beschadigd is in Centrum, Schalkwijk, Waarderpolder en omgeving —
          ons schaderapport is snel en eenvoudig aan te vragen.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          In Haarlem en omgeving (inclusief Heemstede en Bloemendaal) stellen wij officiële TV schadetaxatierapporten op.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Vul het formulier in, upload minimaal 2 foto&apos;s van uw beschadigde televisie en betaal veilig
          via iDEAL. Uw TV schadetaxatie in Haarlem leidt binnen 24 uur tot een officieel PDF-rapport
          dat geaccepteerd wordt door alle Nederlandse verzekeraars.
        </p>
        <TrustBadges />
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/tv-schadetaxatie-amsterdam" className="text-sky-700 hover:underline text-sm">Amsterdam</Link>
          <Link href="/tv-schadetaxatie-rotterdam" className="text-sky-700 hover:underline text-sm">Rotterdam</Link>
          <Link href="/tv-schadetaxatie-den-haag" className="text-sky-700 hover:underline text-sm">Den Haag</Link>
          <Link href="/tv-schadetaxatie-utrecht" className="text-sky-700 hover:underline text-sm">Utrecht</Link>
          <Link href="/tv-schadetaxatie-eindhoven" className="text-sky-700 hover:underline text-sm">Eindhoven</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
          <Link href="/tv-schaderapport-verzekeraar" className="text-sky-700 hover:underline text-sm">Rapport voor verzekeraar</Link>
        </div>
      </div>
      <CTASection title="TV Schadetaxatie Haarlem — Rapport binnen 24 uur" />
    </>
  )
}
