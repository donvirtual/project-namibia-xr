import type { Metadata } from "next"
import Link from "next/link"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/lg-tv-schaderapport"]

export default function LGPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tvschaderapport.nl" },
    { name: "LG TV Schaderapport", url: "https://tvschaderapport.nl/lg-tv-schaderapport" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "LG TV Schaderapport" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          LG TV Schaderapport voor Verzekering
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          LG televisie beschadigd? Officieel schaderapport voor alle LG modellen — OLED, QNED, NanoCell, UHD.
          Geaccepteerd door alle verzekeraars. v.a. €49, binnen 24 uur per e-mail.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Alle LG modellen</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Wij stellen schadetaxatierapporten op voor alle LG televisiemodellen, waaronder LG OLED evo,
          LG QNED, LG NanoCell en LG UHD. LG OLED-schermen zijn door hun dunne organische laag bijzonder
          kwetsbaar voor schade en in vrijwel alle gevallen economisch total loss bij schermschade.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          De dagwaarde van LG OLED televisies bepalen wij op basis van actuele vergelijkingswebsites,
          conform de richtlijnen van het Verbond van Verzekeraars. LG televisies behouden dankzij hun
          OLED-kwaliteit doorgaans een goede marktwaarde.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link href="/samsung-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Samsung TV rapport</Link>
          <Link href="/philips-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Philips TV rapport</Link>
          <Link href="/sony-tv-schaderapport" className="text-sky-700 hover:underline text-sm">Sony TV rapport</Link>
          <Link href="/tv-total-loss-verklaring" className="text-sky-700 hover:underline text-sm">Total loss verklaring</Link>
        </div>
      </div>
      <CTASection title="LG TV beschadigd? Wij stellen het rapport op." />
    </>
  )
}
