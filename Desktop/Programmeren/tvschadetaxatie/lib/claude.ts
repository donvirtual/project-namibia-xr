import { Order } from "./orders"

export interface RapportAssessment {
  defecte_onderdelen: Array<{ naam: string; partnummer: string }>
  reparatiekosten_totaal: number
  is_total_loss: boolean
}

export async function generateRapportAssessment(order: Order): Promise<RapportAssessment> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error("No Anthropic API key")

  const prompt = `Je bent een gecertificeerde TV-reparatie expert in Nederland die schadetaxatierapporten opstelt voor verzekeraars.

Toestel: ${order.merk}${order.model ? " " + order.model : ""}
Schermformaat: ${order.schermformaat}
Aanschafjaar: ${order.aanschafjaar}
Aankoopprijs: €${order.aankoopprijs}
Oorzaak schade: ${order.oorzaak}
Beschrijving: ${order.omschrijving}

Geef een realistische technische beoordeling:
- Welke onderdelen zijn waarschijnlijk defect bij deze schade?
- Wat zijn de all-in reparatiekosten (onderdelen + arbeid, marktconforme prijzen 2025)?
- Is het toestel total loss? (alleen ja als reparatiekosten > 80% van aankoopprijs)

Gebruik realistische partnummer-notatie voor het betreffende merk (bijv. Samsung: BN94-XXXXX / BN41-XXXXX, LG: EBT-XXXXX, Sony: A-XXXXXXX-X). Als model onbekend is gebruik "zie sticker achterpaneel".

Geef ALLEEN geldige JSON terug, geen andere tekst:
{
  "defecte_onderdelen": [
    {"naam": "Mainboard", "partnummer": "BN94-XXXXX / BN41-XXXXX"}
  ],
  "reparatiekosten_totaal": 450,
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
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  const data = await res.json()
  const text: string = data.content?.[0]?.text ?? "{}"
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error("No JSON in Claude response")
  return JSON.parse(match[0]) as RapportAssessment
}
