import { Order } from "./orders"
import { RapportAssessment } from "./claude"

export function generateRapportHTML(order: Order, assessment: RapportAssessment): string {
  const datum = new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "numeric", year: "numeric" }).replace(/\//g, "-")

  const fotoRows = order.fotos.map((url, i) => {
    const labels = ["Foto voorkant", "Foto specificaties (achterkant)", "Foto schade"]
    const label = labels[i] ?? `Foto ${i + 1}`
    return `<tr><td>${label}</td><td><a href="${url}">Link foto ${i + 1}</a></td><td></td></tr>`
  }).join("\n  ")

  const defecteOnderdelen = assessment.defecte_onderdelen ?? []
  const [eerste, ...rest] = defecteOnderdelen
  const eersteRij = eerste
    ? `<tr><td>${eerste.naam} defect &nbsp;&nbsp; ${eerste.partnummer}</td><td colspan="1">Reparatiekosten all-in</td><td>&euro; ${(assessment.reparatiekosten_totaal ?? 0).toFixed(2).replace(".", ",")}</td></tr>`
    : ""
  const restRijen = rest.map(o =>
    `<tr><td>${o.naam} defect &nbsp;&nbsp; ${o.partnummer}</td><td></td><td></td></tr>`
  ).join("\n  ")

  const adresRegel = [order.straat, [order.postcode, order.woonplaats].filter(Boolean).join(" ")].filter(Boolean).join("<br>")

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 13px; margin: 40px; color: #000; }
  h1 { font-style: italic; font-size: 18px; margin-bottom: 4px; }
  .header-grid { display: flex; justify-content: space-between; margin-bottom: 24px; }
  .header-left { font-size: 12px; line-height: 1.8; }
  .header-right { font-size: 12px; line-height: 1.8; text-align: right; }
  .voor { margin-bottom: 20px; }
  .voor strong { display: block; margin-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  td { border: 1px solid #000; padding: 5px 8px; vertical-align: top; }
  td:first-child { font-weight: bold; width: 40%; }
  td:last-child { width: 15%; text-align: right; }
  .footer-table td { border: 1px solid #000; }
  .footer-table td:first-child { font-style: italic; font-weight: normal; background: #ffffcc; }
  @media print { body { margin: 20px; } }
</style>
</head>
<body>

<h1>tvschaderapport.nl</h1>

<div class="header-grid">
  <div class="header-left">
    Amsterdam, Nederland<br>
    info@tvschaderapport.nl<br>
    +31 6 30 19 25 52
  </div>
  <div class="header-right">
    Rapportnummer &nbsp;&nbsp; ${order.orderId}<br>
    Datum &nbsp;&nbsp; ${datum}
  </div>
</div>

<div class="voor">
  <strong>Verzekeringstaxatie voor:</strong>
  ${order.customerName}${adresRegel ? `<br>${adresRegel}` : ""}
</div>

<table>
  <tr>
    <td>Omschrijving</td>
    <td></td>
    <td>Kosten</td>
  </tr>
  <tr><td>Merk</td><td>${order.merk}</td><td></td></tr>
  <tr><td>Modelnummer</td><td>${order.model || "—"}</td><td></td></tr>
  <tr><td>Serienummer</td><td>${order.serienummer || "—"}</td><td></td></tr>
  ${fotoRows}
  <tr><td>Aankoopprijs*</td><td>&euro; ${Number(order.aankoopprijs).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</td><td></td></tr>
  ${order.verzekeraar ? `<tr><td>Verzekeraar</td><td>${order.verzekeraar}</td><td></td></tr>` : ""}
  ${order.referentieNummer ? `<tr><td>Schadenummer</td><td>${order.referentieNummer}</td><td></td></tr>` : ""}
  <tr><td>Aankoopdatum*</td><td>${new Date(order.aankoopdatum).toLocaleDateString("nl-NL")}</td><td></td></tr>
  <tr><td>Oorzaak van de schade</td><td>${order.oorzaak}</td><td></td></tr>
  ${eersteRij}
  ${restRijen}
  <tr><td colspan="3"><strong>Toestel is ${assessment.is_total_loss ? "" : "niet "}total loss</strong></td></tr>
  <tr><td colspan="3">*opgave klant</td></tr>
</table>

<table class="footer-table">
  <tr>
    <td style="font-style:italic; background:#ffffcc;">Taxatiekosten (betaald)</td>
    <td style="text-align:right;">&euro; ${(order.betaaldPrijs ?? 49).toFixed(2).replace(".", ",")}</td>
  </tr>
</table>

</body>
</html>`
}
