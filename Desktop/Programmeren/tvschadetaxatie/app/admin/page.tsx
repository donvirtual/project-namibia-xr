"use client"
import { useState, useEffect } from "react"
import OrderCard from "@/components/OrderCard"
import { Order } from "@/lib/orders"

type FilterType = "all" | "paid" | "in_progress" | "completed"
type TabType = "orders" | "leads"

interface Lead {
  email: string
  naam: string
  merk: string
  schermformaat: string
  oorzaak: string
  abVariant: string
  stap: string
  createdAt: string
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [tab, setTab] = useState<TabType>("orders")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function login() {
    setLoading(true)
    setError("")
    const [ordersRes, leadsRes] = await Promise.all([
      fetch("/api/admin/orders", { headers: { Authorization: `Bearer ${password}` } }),
      fetch("/api/admin/leads", { headers: { Authorization: `Bearer ${password}` } }),
    ])
    if (ordersRes.ok) {
      const [ordersData, leadsData] = await Promise.all([ordersRes.json(), leadsRes.json()])
      setOrders(ordersData.orders)
      setLeads(leadsData.leads || [])
      setAuthed(true)
    } else {
      setError("Verkeerd wachtwoord")
    }
    setLoading(false)
  }

  function updateOrder(updated: Order) {
    setOrders((prev) => prev.map((o) => (o.orderId === updated.orderId ? updated : o)))
  }

  const filtered = orders.filter((o) => filter === "all" || o.status === filter)
  const paidOrders = orders.filter((o) => o.status !== "pending_payment")
  const stats = {
    total: orders.length,
    today: orders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString()).length,
    paid: orders.filter((o) => o.status === "paid").length,
    revenue: paidOrders.reduce((sum, o) => sum + (o.betaaldPrijs || 49), 0),
  }
  const abStats = (["A", "B", "C"] as const).map((v) => {
    const vOrders = paidOrders.filter((o) => o.abVariant === v)
    return { variant: v, count: vOrders.length, revenue: vOrders.reduce((s, o) => s + (o.betaaldPrijs || 49), 0) }
  })

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin login</h1>
          {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Wachtwoord"
            className="w-full border border-gray-300 px-3 py-2.5 mb-4 focus:outline-none focus:border-blue-800"
          />
          <button
            onClick={login}
            disabled={loading}
            className="w-full text-white font-semibold py-2.5 disabled:opacity-60"
            style={{ backgroundColor: "var(--navy)" }}
          >
            {loading ? "Inloggen..." : "Inloggen"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button onClick={() => setAuthed(false)} className="text-sm text-gray-500 hover:text-gray-700">
          Uitloggen
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Totaal orders", value: stats.total },
          { label: "Vandaag", value: stats.today },
          { label: "Nieuw (ongelezen)", value: stats.paid },
          { label: "Omzet", value: `€${stats.revenue}` },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 p-4">
            <p className="text-gray-500 text-sm">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* A/B stats */}
      <div className="bg-white border border-gray-200 p-4 mb-6">
        <p className="font-semibold text-gray-700 text-sm mb-3">A/B Test (betaalde orders)</p>
        <div className="grid grid-cols-3 gap-3">
          {abStats.map((s) => (
            <div key={s.variant} className="border border-gray-200 p-3 text-center">
              <p className="text-xs font-bold text-gray-600 mb-1">
                Variant {s.variant} — {s.variant === "A" ? "€30" : s.variant === "B" ? "€49" : "€59"}
              </p>
              <p className="text-xl font-bold text-gray-900">{s.count} orders</p>
              <p className="text-xs text-gray-500 mt-0.5">€{s.revenue} omzet</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-6">
        {(["orders", "leads"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === t
                ? "border-blue-800 text-blue-800"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "orders" ? `Orders (${orders.length})` : `Leads (${leads.length})`}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <>
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["all", "paid", "in_progress", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors border ${
                  filter === f
                    ? "text-white border-blue-800"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
                style={filter === f ? { backgroundColor: "var(--navy)" } : {}}
              >
                {f === "all" ? "Alle" : f === "paid" ? "Nieuw" : f === "in_progress" ? "In behandeling" : "Afgerond"}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-16">Geen orders gevonden</div>
          ) : (
            <div className="space-y-4">
              {filtered.map((order) => (
                <OrderCard key={order.orderId} order={order} password={password} onStatusUpdate={updateOrder} />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "leads" && (
        <>
          {/* Funnel */}
          {leads.length > 0 && (() => {
            const stappen = [
              { stap: "formulier_gestart", label: "Stap 1 klaar" },
              { stap: "fotos_geupload", label: "Foto's geüpload" },
              { stap: "voor_betaling", label: "Gegevens ingevuld" },
            ]
            const betaald = orders.filter(o => o.status !== "pending_payment").length
            const counts = stappen.map(s => leads.filter(l => l.stap === s.stap).length)
            const max = Math.max(...counts, betaald, 1)
            return (
              <div className="bg-white border border-gray-200 p-4 mb-6">
                <p className="font-semibold text-gray-700 text-sm mb-4">Funnel — waar haken mensen af?</p>
                <div className="space-y-2">
                  {stappen.map((s, i) => (
                    <div key={s.stap} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-36 shrink-0">{s.label}</span>
                      <div className="flex-1 bg-gray-100 h-6 relative">
                        <div className="h-6 absolute left-0 top-0" style={{ width: `${(counts[i] / max) * 100}%`, backgroundColor: "var(--navy)" }} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8 text-right">{counts[i]}</span>
                      {i > 0 && counts[i - 1] > 0 && (
                        <span className="text-xs text-red-500 w-12">-{Math.round((1 - counts[i] / counts[i - 1]) * 100)}%</span>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-36 shrink-0">Betaald</span>
                    <div className="flex-1 bg-gray-100 h-6 relative">
                      <div className="h-6 absolute left-0 top-0 bg-green-500" style={{ width: `${(betaald / max) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8 text-right">{betaald}</span>
                  </div>
                </div>
              </div>
            )
          })()}
        <div className="space-y-3">
          {leads.length === 0 ? (
            <div className="text-center text-gray-400 py-16">Nog geen leads</div>
          ) : (
            leads.map((lead, i) => (
              <div key={i} className="bg-white border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{lead.naam || "—"}</p>
                  <a href={`mailto:${lead.email}`} className="text-sm hover:underline" style={{ color: "var(--navy)" }}>
                    {lead.email}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {lead.merk} · {lead.schermformaat} · {lead.oorzaak}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs px-2 py-1 bg-yellow-50 border border-yellow-200 text-yellow-700 font-medium">
                    Variant {lead.abVariant}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <a
                    href={`mailto:${lead.email}?subject=Uw TV schaderapport aanvraag&body=Beste ${lead.naam || ""},`}
                    className="text-xs font-semibold px-3 py-1.5 text-white"
                    style={{ backgroundColor: "var(--navy)" }}
                  >
                    Mailen →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
        </>
      )}
    </div>
  )
}
