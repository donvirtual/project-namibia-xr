import type { Metadata } from "next"
import CTASection from "@/components/CTASection"
import TrustBadges from "@/components/TrustBadges"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/over-ons"]

export default function OverOnsPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Over tvschaderapport.nl</h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          tvschaderapport.nl is een online dienst voor officiële schadetaxatie van televisies. Wij stellen
          professionele schaderapport op die geaccepteerd worden door alle Nederlandse verzekeraars.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Onze missie</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Het aanvragen van een officieel schaderapport voor uw televisie moet eenvoudig, snel en
          betaalbaar zijn. Traditionele taxateurs rekenen hoge tarieven en vragen u naar hun kantoor
          te komen. Wij bieden een volledig online alternatief: u uploadt uw foto&apos;s, wij beoordelen
          de schade en u ontvangt het rapport binnen 24 uur per e-mail.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Onze werkwijze</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Wij beoordelen schade op basis van de foto&apos;s en informatie die u aanlevert. Onze dagwaarde-
          berekening is conform de afschrijvingsrichtlijnen van het Verbond van Verzekeraars — dezelfde
          richtlijnen die alle Nederlandse verzekeraars hanteren.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          Ons schaderapport bevat alle elementen die verzekeraars vragen: apparaatgegevens, dagwaarde-
          berekening, schade-oordeel en fotodocumentatie. Het rapport is voorzien van een officieel
          rapportnummer en datum.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat wij bieden</h2>
        <TrustBadges />

        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-700 text-sm">
            E-mail: <a href="mailto:info@tvschaderapport.nl" className="text-sky-700 underline">info@tvschaderapport.nl</a><br />
            Amsterdam, Nederland
          </p>
        </div>
      </div>

      <CTASection />
    </>
  )
}
