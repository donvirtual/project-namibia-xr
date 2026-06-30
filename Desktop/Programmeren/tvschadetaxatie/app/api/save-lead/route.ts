import { put } from "@vercel/blob"
import { Resend } from "resend"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

function cleanEnv(val: string | undefined): string {
  return (val ?? "").replace(/﻿/g, "").trim()
}

async function saveLead(key: string, data: object) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return
  await put(key, JSON.stringify(data), { access: "public", token, allowOverwrite: true })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, naam, merk, schermformaat, oorzaak, omschrijving, abVariant, stap } = body

    const resend = new Resend(cleanEnv(process.env.RESEND_API_KEY) || "placeholder")
    const adminEmail = cleanEnv(process.env.ADMIN_EMAIL)

    if (!adminEmail) return NextResponse.json({ ok: false, reason: "no_admin_email" })

    if (stap === "pagina_bezocht") {
      await resend.emails.send({
        from: "tvschaderapport.nl <info@tvschaderapport.nl>",
        to: adminEmail,
        subject: `Bezoeker op aanvraagpagina (variant ${abVariant})`,
        html: `<p>Iemand heeft geklikt op <b>Rapport aanvragen</b> en bezoekt de aanvraagpagina.</p><p>A/B variant: <b>${abVariant}</b></p>`,
      })
      return NextResponse.json({ ok: true })
    }

    if (stap === "formulier_gestart") {
      await Promise.all([
        saveLead(`leads/${Date.now()}-formulier-${(merk ?? "").replace(/[^a-z0-9]/gi, "_")}.json`, {
          stap, merk, schermformaat, oorzaak, omschrijving, abVariant, createdAt: new Date().toISOString(),
        }),
        resend.emails.send({
          from: "tvschaderapport.nl <info@tvschaderapport.nl>",
          to: adminEmail,
          subject: `Aanvraag gestart: ${merk} ${schermformaat} (${oorzaak})`,
          html: `<p>Iemand is begonnen met een aanvraag:</p>
                 <ul>
                   <li><b>Merk:</b> ${merk}</li>
                   <li><b>Formaat:</b> ${schermformaat}</li>
                   <li><b>Oorzaak:</b> ${oorzaak}</li>
                   <li><b>Omschrijving:</b> ${omschrijving || "—"}</li>
                   <li><b>Variant:</b> ${abVariant}</li>
                 </ul>`,
        }),
      ])
      return NextResponse.json({ ok: true })
    }

    if (stap === "fotos_geupload") {
      await saveLead(`leads/${Date.now()}-fotos-${(merk ?? "").replace(/[^a-z0-9]/gi, "_")}.json`, {
        stap, merk, schermformaat, oorzaak, abVariant, createdAt: new Date().toISOString(),
      })
      return NextResponse.json({ ok: true })
    }

    if (stap === "voor_betaling" && email) {
      const lead = {
        email, naam: naam || "", merk: merk || "",
        schermformaat: schermformaat || "", oorzaak: oorzaak || "",
        abVariant: abVariant || "B", stap,
        createdAt: new Date().toISOString(),
      }
      await Promise.all([
        saveLead(`leads/${Date.now()}-${email.replace(/[^a-z0-9]/gi, "_")}.json`, lead),
        resend.emails.send({
          from: "tvschaderapport.nl <info@tvschaderapport.nl>",
          to: adminEmail,
          subject: `Nieuwe lead (niet betaald): ${naam || email} - ${merk}`,
          html: `<p>Iemand heeft het formulier ingevuld maar nog niet betaald:</p>
                 <ul>
                   <li><b>Naam:</b> ${naam || "—"}</li>
                   <li><b>E-mail:</b> <a href="mailto:${email}">${email}</a></li>
                   <li><b>Merk:</b> ${merk}</li>
                   <li><b>Oorzaak:</b> ${oorzaak}</li>
                   <li><b>Variant:</b> ${abVariant}</li>
                 </ul>
                 <p><a href="${process.env.NEXT_PUBLIC_URL}/admin">Bekijk leads in admin</a></p>`,
        }),
      ])
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, reason: String(err) })
  }
}
