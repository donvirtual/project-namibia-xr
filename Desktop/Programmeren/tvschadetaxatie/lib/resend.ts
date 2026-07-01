import { Resend } from "resend"
import { Order } from "./orders"

function getResend() {
  const key = (process.env.RESEND_API_KEY ?? "").replace(/﻿/g, "").trim()
  return new Resend(key || "placeholder")
}

export async function sendCustomerConfirmation(order: Order) {
  const resend = getResend()
  await resend.emails.send({
    from: "tvschaderapport.nl <info@tvschaderapport.nl>",
    replyTo: "donkuenen@gmail.com",
    to: order.customerEmail,
    subject: `Aanvraag ontvangen - rapport volgt binnen 24 uur | tvschaderapport.nl`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #003f7d;">tvschaderapport.nl</h2>
        <p>Beste ${order.customerName},</p>
        <p>Uw aanvraag voor een officieel schaderapport is ontvangen en betaald.</p>
        <table style="width:100%; border-collapse:collapse; margin: 20px 0;">
          <tr style="background:#f8fafc;">
            <td style="padding:10px; font-weight:bold;">Aanvraagnummer</td>
            <td style="padding:10px;">${order.orderId}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold;">Televisie</td>
            <td style="padding:10px;">${order.merk} ${order.model || ""}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding:10px; font-weight:bold;">Aanschafjaar</td>
            <td style="padding:10px;">${order.aanschafjaar}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold;">Betaald</td>
            <td style="padding:10px;">EUR ${order.betaaldPrijs ?? 49}</td>
          </tr>
        </table>
        <p><strong>Wat nu?</strong><br>
        Ons team beoordeelt uw aanvraag en de foto's. U ontvangt uw officiële schaderapport (PDF) binnen 24 uur op dit e-mailadres.</p>
        <p>Vragen? Mail naar <a href="mailto:info@tvschaderapport.nl">info@tvschaderapport.nl</a></p>
        <p>Met vriendelijke groet,<br><strong>tvschaderapport.nl</strong></p>
      </div>
    `,
  })
}

export async function sendAdminNotification(order: Order) {
  const resend = getResend()
  const fotoLinks = order.fotos
    .map((url, i) => `<a href="${url}">Foto ${i + 1}</a>`)
    .join(" | ")

  await resend.emails.send({
    from: "tvschaderapport.nl <info@tvschaderapport.nl>",
    to: (process.env.ADMIN_EMAIL ?? "").replace(/^﻿/, "").trim(),
    subject: `Nieuwe order ${order.orderId} — ${order.merk} ${order.model || ""} — EUR ${order.betaaldPrijs ?? 49}`,
    html: `
      <div style="font-family: monospace; max-width: 700px; font-size: 13px;">
        <h2 style="border-bottom: 2px solid #000; padding-bottom: 8px;">NIEUWE AANVRAAG — ${order.orderId}</h2>

        <p><b>Betaald:</b> ${new Date(order.paidAt || order.createdAt).toLocaleString("nl-NL")}<br>
        <b>Bedrag:</b> EUR ${order.betaaldPrijs ?? 49} (variant ${order.abVariant ?? "B"})</p>

        <h3>KLANT</h3>
        <p><b>Naam:</b> ${order.customerName}<br>
        <b>Email:</b> ${order.customerEmail}<br>
        <b>Tel:</b> ${order.customerPhone || "—"}<br>
        <b>Adres:</b> ${order.straat || "—"}, ${order.postcode || "—"} ${order.woonplaats || "—"}<br>
        <b>Verzekeraar:</b> ${order.verzekeraar || "—"}<br>
        <b>Referentie:</b> ${order.referentieNummer || "—"}</p>

        <h3>TELEVISIE</h3>
        <p><b>Merk/Model:</b> ${order.merk} ${order.model || ""}<br>
        <b>Serienummer:</b> ${order.serienummer || "—"}<br>
        <b>Formaat:</b> ${order.schermformaat}<br>
        <b>Aangeschaft:</b> ${order.aanschafjaar} voor EUR ${order.aankoopprijs}<br>
        <b>Oorzaak:</b> ${order.oorzaak}<br>
        <b>Beschrijving:</b> ${order.omschrijving}</p>

        <h3>FOTO'S (${order.fotos.length})</h3>
        <p>${fotoLinks}</p>

        <p><a href="${process.env.NEXT_PUBLIC_URL || "https://tvschaderapport.nl"}/admin">→ Open Admin Dashboard</a></p>
      </div>
    `,
  })
}

export async function sendCustomerFactuur(order: Order) {
  const resend = getResend()
  const datum = new Date(order.paidAt || order.createdAt).toLocaleDateString("nl-NL", {
    day: "numeric", month: "long", year: "numeric"
  })
  const adresRegel = [order.straat, order.postcode, order.woonplaats].filter(Boolean).join(", ")

  await resend.emails.send({
    from: "tvschaderapport.nl <info@tvschaderapport.nl>",
    replyTo: "info@tvschaderapport.nl",
    to: order.customerEmail,
    subject: `Factuur ${order.orderId} — tvschaderapport.nl`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #000;">
        <p style="font-size: 15px; font-style: italic; font-weight: bold; margin-bottom: 4px;">tvschaderapport.nl</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin-bottom: 20px;">
        <p>Geachte ${order.customerName},</p>
        <p>Bijgaand ontvangt u de factuur voor de schadetaxatie van uw televisie.</p>
        <table style="border-collapse: collapse; margin: 16px 0; font-size: 13px; width: 100%;">
          <tr><td style="padding: 6px 16px 6px 0; color: #555; width: 40%;">Factuurnummer</td><td style="padding: 6px 0;"><strong>${order.orderId}</strong></td></tr>
          <tr><td style="padding: 6px 16px 6px 0; color: #555;">Datum</td><td style="padding: 6px 0;">${datum}</td></tr>
          <tr><td style="padding: 6px 16px 6px 0; color: #555;">Factuur aan</td><td style="padding: 6px 0;">${order.customerName}${adresRegel ? `<br>${adresRegel}` : ""}</td></tr>
          <tr><td style="padding: 6px 16px 6px 0; color: #555;">Omschrijving</td><td style="padding: 6px 0;">Schadetaxatie televisie (${order.merk}${order.model ? " " + order.model : ""})</td></tr>
          <tr><td style="padding: 6px 16px 6px 0; color: #555;">Bedrag</td><td style="padding: 6px 0;">&euro; ${(order.betaaldPrijs ?? 49).toFixed(2)}</td></tr>
          <tr><td style="padding: 6px 16px 6px 0; color: #555;">Status</td><td style="padding: 6px 0; color: green;"><strong>Betaald</strong></td></tr>
        </table>
        <p style="font-size: 12px; color: #555;">Deze kosten zijn in veel gevallen verhaalbaar op uw verzekeraar op grond van artikel 7:959 BW. Voeg de factuur toe aan uw schadeclaim.</p>
        <p>Met vriendelijke groet,<br><strong>tvschaderapport.nl</strong><br>
        <a href="mailto:info@tvschaderapport.nl">info@tvschaderapport.nl</a> | +31 6 30 19 25 52</p>
      </div>
    `,
  })
}
