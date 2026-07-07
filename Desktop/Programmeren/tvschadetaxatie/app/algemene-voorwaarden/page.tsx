import type { Metadata } from "next"
import { seoPages } from "@/config/seoPages"

export const metadata: Metadata = seoPages["/algemene-voorwaarden"]

export default function VoorwaardenPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Algemene Voorwaarden</h1>
      <p className="text-gray-500 text-sm mb-8">Versie: januari 2025</p>

      {[
        {
          title: "Artikel 1 — Definities",
          body: "In deze voorwaarden wordt verstaan onder: Dienstverlener: tvschaderapport.nl; Opdrachtgever: de persoon die een schaderapport aanvraagt; Rapport: het officiële schadetaxatierapport dat door tvschaderapport.nl wordt opgesteld.",
        },
        {
          title: "Artikel 2 — Toepasselijkheid",
          body: "Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen tvschaderapport.nl en opdrachtgevers met betrekking tot het opstellen van schadetaxatierapporten voor televisies.",
        },
        {
          title: "Artikel 3 — De dienst",
          body: "tvschaderapport.nl stelt op basis van de door de opdrachtgever aangeleverde informatie en fotomateriaal een officieel schadetaxatierapport op voor televisies. Het rapport bevat een dagwaardeberekening en een schade-oordeel.",
        },
        {
          title: "Artikel 4 — Prijs en betaling",
          body: "De prijs voor het schaderapport bedraagt v.a. €49 incl. BTW. Betaling dient te geschieden via de door tvschaderapport.nl aangeboden betaalmethoden (iDEAL of creditcard). Na ontvangst van de betaling wordt het rapport opgesteld.",
        },
        {
          title: "Artikel 5 — Levertijd",
          body: "tvschaderapport.nl streeft ernaar het rapport binnen 24 uur na ontvangst van de betaling per e-mail te leveren. Op werkdagen vóór 14:00 uur ingediende aanvragen worden doorgaans dezelfde dag afgehandeld.",
        },
        {
          title: "Artikel 6 — Aansprakelijkheid",
          body: "tvschaderapport.nl is niet aansprakelijk voor schade die voortvloeit uit de weigering van een verzekeraar het rapport te accepteren. Het rapport is opgesteld op basis van de aangeleverde informatie; onjuiste informatie van de opdrachtgever bevrijdt tvschaderapport.nl van aansprakelijkheid.",
        },
        {
          title: "Artikel 7 — Herroepingsrecht",
          body: "Aangezien het rapport een op maat gemaakte dienst betreft die direct na betaling wordt gestart, vervalt het herroepingsrecht zodra de opdrachtgever uitdrukkelijk heeft ingestemd met directe uitvoering en kennisneemt van het verlies van herroepingsrecht.",
        },
        {
          title: "Artikel 8 — Toepasselijk recht",
          body: "Op deze voorwaarden is uitsluitend Nederlands recht van toepassing. Geschillen worden beslecht door de bevoegde rechtbank te Amsterdam.",
        },
      ].map((art) => (
        <section key={art.title} className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">{art.title}</h2>
          <p className="text-gray-700 leading-relaxed">{art.body}</p>
        </section>
      ))}
    </div>
  )
}
