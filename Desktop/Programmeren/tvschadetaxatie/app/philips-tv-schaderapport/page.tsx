import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/philips-tv-schaderapport"]

export default function PhilipsPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "Philips TV Schaderapport", url: "https://tvschaderapport.nl/philips-tv-schaderapport" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Philips TV Schaderapport" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Philips TV Schaderapport voor Verzekering
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Philips televisie beschadigd? Officieel schaderapport voor alle Philips modellen, inclusief de
          populaire Ambilight serie. Geaccepteerd door alle verzekeraars. v.a. €49, binnen 24 uur per e-mail.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Philips Ambilight en alle andere modellen</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Philips is een van de meest vertrouwde tv-merken in Nederland. De Ambilight-technologie maakt
          Philips tv&apos;s herkenbaar en populair. Wij stellen schadetaxatierapporten op voor alle Philips modellen,
          waaronder de OLED+, OLED, 4K UHD en Full HD series — met en zonder Ambilight.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Philips OLED-televisies met Ambilight zijn relatief duur in aanschaf en hebben daardoor doorgaans
          een hogere dagwaarde dan gemiddelde televisies. Dit werkt in uw voordeel bij een schadeclaim.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link href="/samsung-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Samsung TV rapport</Link>
          <Link href="/lg-tv-schaderapport" className="text-sky-700 hover:underline text-sm">LG TV rapport</Link>
          <Link href="/sony-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Sony TV rapport</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
        </div>
      </div>
      <CTASection title="Philips TV beschadigd? Wij stellen het rapport op." />
    </>
  )
}
