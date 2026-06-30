import type { Metadata } from "next"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/privacy"]

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Laatst bijgewerkt: januari 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Verwerkingsverantwoordelijke</h2>
        <p className="text-gray-700 leading-relaxed">
          tvschaderapport.nl is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven
          in dit privacybeleid. U kunt contact met ons opnemen via info@tvschaderapport.nl.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Welke gegevens verwerken wij?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">Bij het aanvragen van een schaderapport verwerken wij:</p>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Naam en e-mailadres</li>
          <li>Telefoonnummer (optioneel)</li>
          <li>Gegevens over uw televisie (merk, model, aanschafjaar, aankoopprijs)</li>
          <li>Omschrijving van de schade</li>
          <li>Foto&apos;s van de schade</li>
          <li>Naam van uw verzekeraar en referentienummer (optioneel)</li>
          <li>Betalingsinformatie (verwerkt door Mollie, niet door ons opgeslagen)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Doeleinden verwerking</h2>
        <p className="text-gray-700 leading-relaxed">
          Wij verwerken uw persoonsgegevens uitsluitend voor het opstellen en leveren van het gevraagde
          schaderapport, het verwerken van uw betaling, en het communiceren over uw aanvraag.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Bewaartermijn</h2>
        <p className="text-gray-700 leading-relaxed">
          Wij bewaren uw persoonsgegevens maximaal 2 jaar na afronding van uw aanvraag, conform de
          wettelijke bewaarplicht voor administratie.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Uw rechten</h2>
        <p className="text-gray-700 leading-relaxed">
          U heeft het recht op inzage, correctie, verwijdering, beperking van de verwerking en
          overdraagbaarheid van uw persoonsgegevens. Stuur een verzoek naar info@tvschaderapport.nl.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          Wij gebruiken analytische cookies (Google Analytics 4) om het gebruik van onze website te
          meten. Deze cookies bevatten geen persoonsgegevens. U kunt cookies uitschakelen via uw
          browserinstellingen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">7. Klachten</h2>
        <p className="text-gray-700 leading-relaxed">
          Heeft u een klacht over de verwerking van uw persoonsgegevens? U kunt een klacht indienen
          bij de Autoriteit Persoonsgegevens via autoriteitpersoonsgegevens.nl.
        </p>
      </section>
    </div>
  )
}
