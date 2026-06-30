import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/panasonic-tv-schaderapport"]

export default function PanasonicPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Panasonic TV Schaderapport", url: "https://tvschaderapport.nl/panasonic-tv-schaderapport" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Panasonic TV Schaderapport" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Panasonic TV Schaderapport voor Verzekeraar
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Panasonic televisie beschadigd? Wij stellen een officieel schaderapport op voor uw verzekeraar.
          Alle Panasonic OLED en LED modellen. Binnen 24 uur geleverd per e-mail.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Panasonic staat bekend om zijn hoogwaardige OLED-televisies (TX-serie) en betrouwbare LED-modellen.
          Bij schade aan een Panasonic televisie is vervanging van het OLED-paneel doorgaans duurder dan
          de dagwaarde van het toestel — waardoor de TV als total loss wordt verklaard.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Ons schaderapport is geschikt voor alle Panasonic televisiemodellen, waaronder de TX-65LZ2000E,
          TX-55HX710E, TX-48JZ1500E en alle andere OLED- en LED-series.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Vul ons formulier in met het exacte Panasonic-modelnummer (te vinden op het typeplaatje op de achterkant
          van uw TV), upload foto&apos;s van de schade en ontvang binnen 24 uur uw officieel schaderapport per e-mail.
        </p>
        <TrustBadges />
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-200">
          <Link href="/samsung-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Samsung</Link>
          <Link href="/lg-tv-schaderapport" className="text-sky-700 hover:underline text-sm">LG</Link>
          <Link href="/sony-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Sony</Link>
          <Link href="/philips-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Philips</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
        </div>
      </div>
      <CTASection title="Panasonic TV Beschadigd? Officieel Rapport binnen 24 uur" />
    </>
  )
}
