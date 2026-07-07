import { Order } from "./orders"

export interface RapportAssessment {
  defecte_onderdelen: Array<{ naam: string; partnummer: string; kosten_onderdeel: number }>
  arbeidskosten: number
  reparatiekosten_totaal: number
  is_total_loss: boolean
}

export interface KnownIssue {
  omschrijving: string
  bron?: string
}

export async function generateRapportAssessment(order: Order): Promise<RapportAssessment> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error("No Anthropic API key")

  const prompt = `Je bent een gecertificeerde TV-reparatie expert in Nederland die schadetaxatierapporten opstelt voor verzekeraars.

Toestel: ${order.merk}${order.model ? " " + order.model : ""}
Schermformaat: ${order.schermformaat}
Aankoopdatum: ${new Date(order.aankoopdatum).toLocaleDateString("nl-NL")}
Aankoopprijs: €${order.aankoopprijs}
Oorzaak schade: ${order.oorzaak}
Beschrijving: ${order.omschrijving}

Geef een realistische technische beoordeling:
1. Welke onderdelen zijn waarschijnlijk defect bij deze schade, en wat kost elk onderdeel afzonderlijk (marktconforme prijzen 2025)?
2. Wat zijn de arbeidskosten (marktconform uurtarief x geschatte uren)?
3. Wat is het all-in totaal (onderdelen + arbeid)?
4. Is het toestel total loss? (alleen ja als reparatiekosten > 80% van aankoopprijs)

Gebruik realistische partnummer-notatie voor het betreffende merk (bijv. Samsung: BN94-XXXXX / BN41-XXXXX, LG: EBT-XXXXX, Sony: A-XXXXXXX-X). Als model onbekend is gebruik "zie sticker achterpaneel".

Geef ALLEEN geldige JSON terug, geen andere tekst:
{
  "defecte_onderdelen": [
    {"naam": "Mainboard", "partnummer": "BN94-XXXXX / BN41-XXXXX", "kosten_onderdeel": 180}
  ],
  "arbeidskosten": 90,
  "reparatiekosten_totaal": 270,
  "is_total_loss": false
}`

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  const data = await res.json()
  const text: string = data.content?.[0]?.text ?? "{}"
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error("No JSON in Claude response")
  return JSON.parse(match[0]) as RapportAssessment
}

// Interne info voor de admin — nooit naar de klant sturen. Gebruikt web search
// zodat Claude alleen problemen noemt die daadwerkelijk in een zoekresultaat
// staan (met bron), in plaats van uit het geheugen te verzinnen.
export async function generateKnownIssues(order: Order): Promise<KnownIssue[]> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return []

  const prompt = `Zoek op internet naar daadwerkelijk gedocumenteerde, bekende fabrieksfouten, service bulletins of veelvoorkomende defecten voor dit specifieke tv-model:

Merk/model: ${order.merk}${order.model ? " " + order.model : ""}
Schermformaat: ${order.schermformaat}

Belangrijk: noem ALLEEN problemen die je kunt onderbouwen met een concreet zoekresultaat (forum, reviewsite, supportpagina fabrikant, service bulletin). Verzin niets uit eigen kennis. Als je niets vindt, model onbekend is, of de zoekresultaten geen betrouwbare bron opleveren, geef dan een lege array terug.

Geef aan het eind van je antwoord ALLEEN geldige JSON, geen andere tekst erna, in dit exacte formaat:
{
  "bekende_problemen": [
    {"omschrijving": "korte beschrijving van het probleem", "bron": "https://..."}
  ]
}`

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 3 }],
        messages: [{ role: "user", content: prompt }],
      }),
    })

    const data = await res.json()
    const text: string = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return []
    const parsed = JSON.parse(match[0])
    return Array.isArray(parsed.bekende_problemen) ? parsed.bekende_problemen : []
  } catch (err) {
    console.error("generateKnownIssues mislukt:", err)
    return []
  }
}
