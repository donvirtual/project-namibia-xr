import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/samsung-tv-schaderapport"]

export default function SamsungPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Samsung TV Schaderapport", url: "https://tvschaderapport.nl/samsung-tv-schaderapport" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Samsung TV Schaderapport" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Samsung TV Schaderapport voor Verzekering
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Samsung televisie beschadigd? Wij stellen een officieel schaderapport op voor alle Samsung modellen —
          QLED, Neo QLED, Crystal UHD, The Frame. Geaccepteerd door alle verzekeraars. v.a. €30, binnen 24 uur per e-mail.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Schaderapport voor alle Samsung modellen</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Wij stellen schadetaxatierapporten op voor alle Samsung televisiemodellen, waaronder:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {["Samsung QLED", "Samsung Neo QLED", "Samsung Crystal UHD", "Samsung OLED", "Samsung The Frame", "Samsung The Serif"].map((m) => (
            <div key={m} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              {m}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Waarom juist Samsung?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Samsung is het meest verkochte tv-merk in Nederland. De dagwaarde van Samsung televisies is goed
          te bepalen door de brede beschikbaarheid van vergelijkingsites als Coolblue.nl en Tweakers.net.
          Samsung QLED-televisies behouden relatief goed hun waarde in de eerste jaren.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Een Samsung tv met schermschade is in verreweg de meeste gevallen total loss: een vervangend
          QLED-paneel kost meer dan de dagwaarde van het toestel. Wij leggen dit vast in ons rapport.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link href="/lg-tv-schaderapport" className="text-sky-700 hover:underline text-sm">LG TV rapport</Link>
          <Link href="/philips-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Philips TV rapport</Link>
          <Link href="/sony-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Sony TV rapport</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
        </div>
      </div>
      <CTASection title="Samsung TV beschadigd? Wij stellen het rapport op." />
    </>
  )
}
