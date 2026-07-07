import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/sony-tv-schaderapport"]

export default function SonyPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Sony TV Schaderapport", url: "https://tvschaderapport.nl/sony-tv-schaderapport" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Sony TV Schaderapport" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Sony TV Schaderapport voor Verzekering
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Sony BRAVIA televisie beschadigd? Officieel schaderapport voor alle Sony modellen — OLED, 4K LED,
          8K. Geaccepteerd door alle verzekeraars. v.a. €49, binnen 24 uur per e-mail.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sony BRAVIA — alle modellen</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Sony BRAVIA televisies staan bekend om hun uitstekende beeldkwaliteit en zijn doorgaans wat duurder
          dan gemiddelde televisies. De Sony A95K en A90J OLED-modellen vertegenwoordigen een aanzienlijke
          waarde, wat gunstig is bij een verzekeringsaanspraak.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Wij stellen schadetaxatierapporten op voor alle Sony BRAVIA-modellen, inclusief de XR OLED,
          XR LED, Z-serie (8K) en alle oudere modellen. De dagwaarde bepalen wij op basis van actuele
          marktprijzen conform de richtlijnen van het Verbond van Verzekeraars.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link href="/samsung-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Samsung TV rapport</Link>
          <Link href="/lg-tv-schaderapport" className="text-sky-700 hover:underline text-sm">LG TV rapport</Link>
          <Link href="/philips-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Philips TV rapport</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
        </div>
      </div>
      <CTASection title="Sony TV beschadigd? Wij stellen het rapport op." />
    </>
  )
}
