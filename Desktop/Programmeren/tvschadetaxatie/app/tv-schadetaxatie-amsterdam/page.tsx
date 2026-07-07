import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/tv-schadetaxatie-amsterdam"]

export default function AmsterdamPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "TV Schadetaxatie Amsterdam", url: "https://tvschaderapport.nl/tv-schadetaxatie-amsterdam" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "TV Schadetaxatie Amsterdam" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          TV Schadetaxatie Amsterdam — Schaderapport binnen 24 uur
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          TV beschadigd in Amsterdam? U heeft geen taxateur nodig die bij u langskomt. Onze online TV
          schadetaxatie werkt volledig op afstand — u uploadt de foto&apos;s, wij stellen het officiële
          schaderapport op. Binnen 24 uur per e-mail, voor v.a. €49.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Als Amsterdammer kunt u gebruik maken van onze volledig online dienstverlening voor TV
          schadetaxatie in Amsterdam. Of uw televisie nu beschadigd is in de Jordaan, Oost, Zuid of Noord —
          u hoeft nergens heen. Upload uw foto&apos;s via ons formulier en ontvang uw officieel schaderapport
          binnen 24 uur in uw mailbox.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Ons schaderapport wordt geaccepteerd door alle verzekeraars die actief zijn in Amsterdam,
          waaronder Centraal Beheer, Interpolis, OHRA, Nationale-Nederlanden en alle andere Nederlandse
          verzekeraars. De TV schadetaxatie in Amsterdam verloopt snel en professioneel.
        </p>
        <TrustBadges />
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/tv-schadetaxatie-rotterdam" className="text-sky-700 hover:underline text-sm">Rotterdam</Link>
          <Link href="/tv-schadetaxatie-den-haag" className="text-sky-700 hover:underline text-sm">Den Haag</Link>
          <Link href="/tv-schadetaxatie-utrecht" className="text-sky-700 hover:underline text-sm">Utrecht</Link>
          <Link href="/tv-schadetaxatie-eindhoven" className="text-sky-700 hover:underline text-sm">Eindhoven</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
        </div>
      </div>
      <CTASection title="TV Schadetaxatie Amsterdam — Rapport binnen 24 uur" />
    </>
  )
}
