"use client"
import { useState, useEffect } from "react"
import { AB_COOKIE, AB_VARIANTS, getVariant } from "@/lib/abtest"

export default function HoeHetWerktContent() {
  const [price, setPrice] = useState("49")

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${AB_COOKIE}=([^;]*)`))
    setPrice(AB_VARIANTS[getVariant(match?.[1])].price)
  }, [])

  const steps = [
    {
      num: 1,
      title: "Vul het formulier in",
      desc: "Vul de gegevens van uw televisie in: merk, model, aanschafjaar, aankoopprijs en een omschrijving van de schade. Dit duurt gemiddeld 5 minuten.",
      detail: "U vult ook uw contactgegevens in en kunt optioneel uw verzekeraar en referentienummer vermelden.",
    },
    {
      num: 2,
      title: "Upload foto's van de schade",
      desc: "Upload minimaal 2, maximaal 8 foto's van uw televisie. Maak foto's van de voorkant, de schade van dichtbij, het typeplaatje achterop, en eventuele andere schade.",
      detail: "JPG, PNG en HEIC-bestanden zijn geaccepteerd. Maximaal 15 MB per foto.",
    },
    {
      num: 3,
      title: `Betaal veilig €${price}`,
      desc: `Na het invullen van het formulier betaalt u veilig €${price} via iDEAL of creditcard. Uw betaling wordt verwerkt via Mollie, een Nederlandse betaalprovider.`,
      detail: `Geen verrassingen: €${price} is het enige bedrag dat u betaalt. Kosten zijn in veel gevallen verhaalbaar op uw verzekeraar.`,
    },
    {
      num: 4,
      title: "Wij beoordelen uw aanvraag",
      desc: "Na uw betaling beoordeelt ons team uw aanvraag en foto's. Wij stellen de dagwaarde vast, beoordelen of de televisie repareerbaar is, en stellen het officiële rapport op.",
      detail: "Dit proces duurt maximaal 24 uur. Op werkdagen voor 14:00 ingediend, ontvangst vaak dezelfde dag.",
    },
    {
      num: 5,
      title: "Ontvang uw rapport per e-mail",
      desc: "U ontvangt het officiële PDF-rapport per e-mail. Dit rapport kunt u direct doorsturen naar uw verzekeraar als onderbouwing van uw schadeclaim.",
      detail: "Het rapport bevat alle informatie die verzekeraars nodig hebben: dagwaardeberekening, schade-oordeel, fotodocumentatie en een officieel rapportnummer.",
    },
  ]

  return (
    <>
      <div className="space-y-10">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-6">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-sky-700 text-white flex items-center justify-center text-xl font-bold">
                {step.num}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-2">{step.desc}</p>
              <p className="text-gray-500 text-sm">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-sky-50 border border-sky-200 rounded-xl p-6">
        <h2 className="font-bold text-sky-900 text-lg mb-3">Wat kost het?</h2>
        <p className="text-sky-800 leading-relaxed">
          Het officieel schaderapport kost <strong>€{price} incl. BTW</strong>. Dit is een eenmalig bedrag —
          geen verborgen kosten. In veel gevallen zijn de rapportkosten verhaalbaar op uw verzekeraar of
          de veroorzaker van de schade.
        </p>
      </div>
    </>
  )
}
