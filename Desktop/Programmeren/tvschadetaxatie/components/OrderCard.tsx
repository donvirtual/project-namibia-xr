"use client"
import { Order } from "@/lib/orders"
import { useState } from "react"

const statusLabels: Record<string, string> = {
  pending_payment: "Wacht op betaling",
  paid: "Nieuw",
  in_progress: "In behandeling",
  completed: "Afgerond",
}

const statusColors: Record<string, string> = {
  pending_payment: "bg-gray-100 text-gray-600",
  paid: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
}

export default function OrderCard({ order, password, onStatusUpdate }: {
  order: Order
  password: string
  onStatusUpdate: (o: Order) => void
}) {
  const [loading, setLoading] = useState(false)
  const [rapportLoading, setRapportLoading] = useState(false)
  const [rapportUrl, setRapportUrl] = useState(order.rapportUrl ?? "")
  const [sendLoading, setSendLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function updateStatus(status: Order["status"]) {
    setLoading(true)
    const res = await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ orderId: order.orderId, status }),
    })
    const data = await res.json()
    if (data.order) onStatusUpdate(data.order)
    setLoading(false)
  }

  async function generateRapport() {
    setRapportLoading(true)
    const res = await fetch("/api/generate-rapport", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ orderId: order.orderId }),
    })
    const data = await res.json()
    if (data.url) {
      setRapportUrl(data.url)
      setSent(false)
      onStatusUpdate({
        ...order,
        rapportUrl: data.url,
        rapportAssessment: data.assessment,
        bekendeProblemenGevonden: data.bekendeProblemen,
      })
    }
    setRapportLoading(false)
  }

  async function sendRapport() {
    setSendLoading(true)
    await fetch("/api/send-rapport", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ orderId: order.orderId }),
    })
    setSent(true)
    setSendLoading(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-bold text-lg text-gray-900">#{order.orderId}</p>
          <p className="text-gray-600 text-sm">
            {order.merk} {order.model} — {new Date(order.createdAt).toLocaleDateString("nl-NL")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {order.abVariant && (
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">
              A/B: {order.abVariant} — &euro;{order.betaaldPrijs}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
            {statusLabels[order.status]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-700 mb-4">
        <p><b>Naam:</b> {order.customerName}</p>
        <p><b>Email:</b> <a href={`mailto:${order.customerEmail}`} className="text-sky-700 underline">{order.customerEmail}</a></p>
        {order.customerPhone && <p><b>Tel:</b> {order.customerPhone}</p>}
        {order.serienummer && <p><b>Serienummer:</b> {order.serienummer}</p>}
        {order.straat && <p><b>Adres:</b> {order.straat}, {order.postcode} {order.woonplaats}</p>}
        {order.verzekeraar && <p><b>Verzekeraar:</b> {order.verzekeraar}</p>}
        {order.referentieNummer && <p><b>Schadenummer:</b> {order.referentieNummer}</p>}
        <p><b>Schermformaat:</b> {order.schermformaat}</p>
        <p><b>Aankoopdatum:</b> {new Date(order.aankoopdatum).toLocaleDateString("nl-NL")} | &euro;{order.aankoopprijs}</p>
        <p className="sm:col-span-2"><b>Oorzaak:</b> {order.oorzaak}</p>
        <p className="sm:col-span-2"><b>Omschrijving:</b> {order.omschrijving}</p>
      </div>

      {order.rapportAssessment && (
        <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 mb-4 text-sm text-gray-800">
          <p className="font-bold text-amber-800 text-xs uppercase tracking-wide mb-2">Interne prijsopbouw — niet zichtbaar voor klant</p>
          <ul className="space-y-1 mb-2">
            {order.rapportAssessment.defecte_onderdelen.map((o, i) => (
              <li key={i} className="flex justify-between">
                <span>{o.naam} <span className="text-gray-500">({o.partnummer})</span></span>
                <span>&euro; {o.kosten_onderdeel}</span>
              </li>
            ))}
            <li className="flex justify-between">
              <span>Arbeidskosten</span>
              <span>&euro; {order.rapportAssessment.arbeidskosten}</span>
            </li>
          </ul>
          <p className="flex justify-between font-bold border-t border-amber-200 pt-1">
            <span>Totaal (= bedrag in klantrapport)</span>
            <span>&euro; {order.rapportAssessment.reparatiekosten_totaal}</span>
          </p>
        </div>
      )}

      {order.bekendeProblemenGevonden && order.bekendeProblemenGevonden.length > 0 && (
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 mb-4 text-sm text-gray-800">
          <p className="font-bold text-blue-800 text-xs uppercase tracking-wide mb-2">
            Gevonden via web search — niet zichtbaar voor klant, zelf verifiëren voor gebruik
          </p>
          <ul className="space-y-1.5">
            {order.bekendeProblemenGevonden.map((issue, i) => (
              <li key={i}>
                <span>{issue.omschrijving}</span>
                {issue.bron && (
                  <>
                    {" "}
                    <a href={issue.bron} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">
                      bron
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {order.fotos.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {order.fotos.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              className="block w-16 h-16 rounded overflow-hidden border border-gray-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {order.status === "paid" && (
          <button onClick={() => updateStatus("in_progress")} disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50">
            In behandeling →
          </button>
        )}
        {order.status === "in_progress" && (
          <button onClick={() => updateStatus("completed")} disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50">
            Afgerond ✓
          </button>
        )}

        {order.status !== "pending_payment" && !rapportUrl && (
          <button onClick={generateRapport} disabled={rapportLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50">
            {rapportLoading ? "Rapport genereren..." : "Genereer rapport"}
          </button>
        )}

        {rapportUrl && (
          <>
            <a href={rapportUrl} target="_blank" rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg">
              Bekijk rapport
            </a>
            <button onClick={generateRapport} disabled={rapportLoading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50">
              {rapportLoading ? "Bezig..." : "Opnieuw genereren"}
            </button>
            <button onClick={sendRapport} disabled={sendLoading || sent}
              className="bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50">
              {sent ? "Verstuurd ✓" : sendLoading ? "Versturen..." : "Verstuur naar klant"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
