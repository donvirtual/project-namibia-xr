const MOLLIE_API = "https://api.mollie.com/v2"

function getKey() {
  return (process.env.MOLLIE_API_KEY ?? "").replace(/﻿/g, "").trim()
}

function isAccessToken(key: string) {
  return key.startsWith("access_")
}

export async function createPayment(orderId: string, amount: string, redirectUrl: string, webhookUrl: string) {
  const key = getKey()
  const profileId = (process.env.MOLLIE_PROFILE_ID ?? "").trim()

  const body: Record<string, unknown> = {
    amount: { currency: "EUR", value: amount },
    description: `TV Schaderapport - ${orderId}`,
    redirectUrl,
    webhookUrl,
    metadata: { orderId },
  }
  if (profileId) body.profileId = profileId

  const res = await fetch(`${MOLLIE_API}/payments`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const data = await res.json() as {
    id: string
    status: string
    _links: { checkout: { href: string } }
  }

  if (!res.ok) throw new Error(`Mollie error: ${JSON.stringify(data)}`)

  return {
    id: data.id,
    getCheckoutUrl: () => data._links.checkout.href,
  }
}

export async function getPayment(id: string) {
  const key = getKey()
  const res = await fetch(`${MOLLIE_API}/payments/${id}`, {
    headers: { "Authorization": `Bearer ${key}` },
  })
  return res.json() as Promise<{ id: string; status: string; metadata: { orderId: string } }>
}
