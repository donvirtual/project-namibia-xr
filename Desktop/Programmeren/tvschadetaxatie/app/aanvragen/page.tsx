"use client"
import { useState, useEffect } from "react"
import ProgressBar from "@/components/ProgressBar"
import PhotoUpload from "@/components/PhotoUpload"
import { useRouter } from "next/navigation"
import { AB_COOKIE, AB_VARIANTS, getVariant, type Variant } from "@/lib/abtest"

function readVariantCookie(): Variant {
  if (typeof document === "undefined") return "B"
  const match = document.cookie.match(new RegExp(`(?:^|; )${AB_COOKIE}=([^;]*)`))
  return getVariant(match?.[1])
}

const merken = ["Samsung", "LG", "Philips", "Sony", "Panasonic", "TCL", "Hisense", "Sharp", "Loewe", "Anders"]
const schermformaten = ["t/m 32\"", "33-42\"", "43-55\"", "56-65\"", "66-75\"", "76\" of groter"]
const oorzaken = [
  "Gevallen",
  "Iets ertegen gevallen",
  "Vloeistofschade",
  "Bliksemschade",
  "Kind/huisdier",
  "Inbraak of diefstal",
  "Vervoersschade",
  "Anders",
]

const STEP_LABELS = ["Apparaat", "Foto's", "Uw gegevens", "Betaling"]

interface FormData {
  merk: string
  model: string
  serienummer: string
  schermformaat: string
  aankoopdatum: string
  aankoopprijs: string
  oorzaak: string
  omschrijving: string
  fotos: string[]
  naam: string
  email: string
  telefoon: string
  straat: string
  postcode: string
  woonplaats: string
  verzekeraar: string
  referentieNummer: string
  opmerkingen: string
  akkoord: boolean
}

const initialForm: FormData = {
  merk: "",
  model: "",
  serienummer: "",
  schermformaat: "",
  aankoopdatum: "",
  aankoopprijs: "",
  oorzaak: "",
  omschrijving: "",
  fotos: [],
  naam: "",
  email: "",
  telefoon: "",
  straat: "",
  postcode: "",
  woonplaats: "",
  verzekeraar: "",
  referentieNummer: "",
  opmerkingen: "",
  akkoord: false,
}

const inputCls = "w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-blue-800 bg-white"

export default function AanvragenPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fotosUploading, setFotosUploading] = useState(false)
  const [variant, setVariant] = useState<Variant>("B")
  const router = useRouter()

  useEffect(() => {
    const v = readVariantCookie()
    setVariant(v)
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "form_start", { ab_variant: v, price: AB_VARIANTS[v].price })
    }
    // Notificeer admin direct bij bezoek aanvraagpagina
    fetch("/api/save-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stap: "pagina_bezocht", abVariant: v }),
    }).catch(() => {})
  }, [])

  function set(field: keyof FormData, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function nextStep() {
    setError("")
    if (step === 1) {
      if (!form.merk || !form.schermformaat || !form.aankoopdatum || !form.aankoopprijs || !form.oorzaak || !form.omschrijving) {
        setError("Vul alle verplichte velden in.")
        return
      }
      fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stap: "formulier_gestart", merk: form.merk, schermformaat: form.schermformaat, oorzaak: form.oorzaak, omschrijving: form.omschrijving, abVariant: variant }),
      }).catch(() => {})
    }
    if (step === 2 && fotosUploading) {
      setError("Wacht tot de foto's klaar zijn met uploaden.")
      return
    }
    if (step === 2 && form.fotos.length < 2) {
      setError("Upload minimaal 2 foto's.")
      return
    }
    if (step === 2) {
      fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stap: "fotos_geupload", merk: form.merk, schermformaat: form.schermformaat, oorzaak: form.oorzaak, abVariant: variant }),
      }).catch(() => {})
    }
    if (step === 3) {
      if (!form.naam || !form.email || !form.serienummer || !form.straat || !form.postcode || !form.woonplaats || !form.verzekeraar || !form.referentieNummer || !form.akkoord) {
        setError("Vul alle verplichte velden in en accepteer de voorwaarden.")
        return
      }
      // Lead opslaan — betaalt nog niet maar heeft gegevens ingevuld
      fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          naam: form.naam,
          merk: form.merk,
          schermformaat: form.schermformaat,
          oorzaak: form.oorzaak,
          abVariant: variant,
          stap: "voor_betaling",
        }),
      }).catch(() => {})
    }
    setStep((s) => s + 1)
  }

  async function handleSubmit() {
    setLoading(true)
    setError("")
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "form_complete", { ab_variant: variant, price: AB_VARIANTS[variant].price })
    }
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, abVariant: variant }),
      })
      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        setError("Er ging iets mis. Probeer het opnieuw.")
      }
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Schaderapport aanvragen</h1>
      <p className="text-gray-600 mb-8">Vul het formulier in — duurt ongeveer 5 minuten.</p>

      <ProgressBar currentStep={step} totalSteps={4} labels={STEP_LABELS} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Stap 1: Apparaatgegevens</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Merk *</label>
            <select value={form.merk} onChange={(e) => set("merk", e.target.value)} className={inputCls}>
              <option value="">Selecteer merk</option>
              {merken.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              placeholder="Bijv. Samsung UE55AU7100 (staat achterop de tv)"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schermformaat *</label>
            <select value={form.schermformaat} onChange={(e) => set("schermformaat", e.target.value)} className={inputCls}>
              <option value="">Selecteer formaat</option>
              {schermformaten.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aankoopdatum *</label>
              <input
                type="date"
                value={form.aankoopdatum}
                onChange={(e) => set("aankoopdatum", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aankoopprijs (€) *</label>
              <input
                type="number"
                value={form.aankoopprijs}
                onChange={(e) => set("aankoopprijs", e.target.value)}
                placeholder="799"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Oorzaak schade *</label>
            <select value={form.oorzaak} onChange={(e) => set("oorzaak", e.target.value)} className={inputCls}>
              <option value="">Selecteer oorzaak</option>
              {oorzaken.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wat is er precies met de tv gebeurd? *</label>
            <textarea
              value={form.omschrijving}
              onChange={(e) => set("omschrijving", e.target.value)}
              placeholder='Beschrijf alleen de schade aan de tv, bijv. "scherm gebarsten na val van tafel" of "beeld valt uit na blikseminslag". Geen persoonlijke omstandigheden nodig.'
              rows={4}
              maxLength={500}
              className={`${inputCls} resize-none`}
            />
            <p className="text-xs text-gray-400 mt-1">Alleen de schade zelf, geen aanleiding of persoonlijke situatie. {form.omschrijving.length}/500 tekens</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Stap 2: Foto&apos;s uploaden</h2>
          <p className="text-gray-600 text-sm">Upload minimaal 2 foto&apos;s, maximaal 8.</p>
          <PhotoUpload
            onUpload={(urls) => set("fotos", urls)}
            onUploadingChange={setFotosUploading}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Stap 3: Uw gegevens</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
            <input type="text" value={form.naam} onChange={(e) => set("naam", e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer (optioneel)</label>
            <input type="tel" value={form.telefoon} onChange={(e) => set("telefoon", e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Serienummer tv *</label>
            <input
              type="text"
              value={form.serienummer}
              onChange={(e) => set("serienummer", e.target.value)}
              placeholder="Staat op het sticker achterop de tv"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Straat + huisnummer *</label>
            <input type="text" value={form.straat} onChange={(e) => set("straat", e.target.value)} placeholder="Bijv. Keizersgracht 123" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
              <input type="text" value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="1234 AB" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Woonplaats *</label>
              <input type="text" value={form.woonplaats} onChange={(e) => set("woonplaats", e.target.value)} placeholder="Amsterdam" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verzekeraar *</label>
            <input
              type="text"
              value={form.verzekeraar}
              onChange={(e) => set("verzekeraar", e.target.value)}
              placeholder="Bijv. Centraal Beheer, Interpolis"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referentienummer / schadenummer verzekeraar *</label>
            <input type="text" value={form.referentieNummer} onChange={(e) => set("referentieNummer", e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opmerkingen (optioneel)</label>
            <textarea
              value={form.opmerkingen}
              onChange={(e) => set("opmerkingen", e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="akkoord"
              checked={form.akkoord}
              onChange={(e) => set("akkoord", e.target.checked)}
              className="mt-0.5"
            />
            <label htmlFor="akkoord" className="text-sm text-gray-700">
              Ik ga akkoord met de{" "}
              <a href="/algemene-voorwaarden" target="_blank" className="underline" style={{ color: "var(--navy)" }}>
                algemene voorwaarden
              </a>{" "}
              en het{" "}
              <a href="/privacy" target="_blank" className="underline" style={{ color: "var(--navy)" }}>
                privacybeleid
              </a>{" "}
              *
            </label>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Stap 4: Overzicht &amp; betaling</h2>

          <div className="bg-gray-50 border border-gray-200 p-5 space-y-2 text-sm">
            <p><b>Merk/Model:</b> {form.merk} {form.model}</p>
            <p><b>Schermformaat:</b> {form.schermformaat}</p>
            <p><b>Aankoopdatum:</b> {form.aankoopdatum ? new Date(form.aankoopdatum).toLocaleDateString("nl-NL") : ""} | €{form.aankoopprijs}</p>
            <p><b>Oorzaak:</b> {form.oorzaak}</p>
            <p><b>Schade:</b> {form.omschrijving}</p>
            <p><b>Foto&apos;s:</b> {form.fotos.length} geüpload</p>
            <hr className="my-2 border-gray-200" />
            <p><b>Naam:</b> {form.naam}</p>
            <p><b>E-mail:</b> {form.email}</p>
            {form.telefoon && <p><b>Tel:</b> {form.telefoon}</p>}
            <p><b>Verzekeraar:</b> {form.verzekeraar} ({form.referentieNummer})</p>
          </div>

          <div className="border-2 p-6 text-center" style={{ borderColor: "var(--navy)" }}>
            <p className="text-4xl font-extrabold text-gray-900 mb-1">
              {AB_VARIANTS[variant].label}
            </p>
            <p className="text-gray-500 text-sm mb-1">incl. BTW — eenmalig</p>
            <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>Kosten in veel gevallen verhaalbaar op verzekeraar</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full disabled:opacity-60 text-white font-bold py-4 text-lg transition-colors"
            style={{ backgroundColor: "var(--navy)" }}
          >
            {loading ? "Betaling aanmaken..." : `Betaal veilig ${AB_VARIANTS[variant].label} via iDEAL →`}
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span>Veilig betalen via Mollie</span>
            <span>iDEAL &amp; creditcard</span>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 hover:bg-gray-50"
          >
            ← Terug
          </button>
        )}
        {step < 4 && (
          <button
            onClick={nextStep}
            disabled={step === 2 && fotosUploading}
            className="ml-auto text-white font-bold px-6 py-2.5 transition-colors disabled:opacity-50"
            style={{ backgroundColor: "var(--navy)" }}
          >
            {step === 2 && fotosUploading ? "Uploaden..." : "Volgende →"}
          </button>
        )}
      </div>
    </div>
  )
}
