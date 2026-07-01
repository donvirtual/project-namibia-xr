import { put, list, del } from "@vercel/blob"

export interface Order {
  orderId: string
  status: "pending_payment" | "paid" | "in_progress" | "completed"
  createdAt: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  straat?: string
  postcode?: string
  woonplaats?: string
  merk: string
  model?: string
  serienummer?: string
  schermformaat: string
  aanschafjaar: number
  aankoopprijs: number
  oorzaak: string
  omschrijving: string
  fotos: string[]
  verzekeraar?: string
  referentieNummer?: string
  opmerkingen?: string
  abVariant?: string
  betaaldPrijs?: number
  molliePaymentId?: string
  paidAt?: string
  completedAt?: string
  rapportUrl?: string
}

function generateOrderId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9000) + 1000
  return `TVS-${year}-${random}`
}

const ORDERS_PREFIX = "orders/"
const token = process.env.BLOB_READ_WRITE_TOKEN

// In-memory fallback for local dev without blob token
const memStore: Record<string, Order> = {}

async function saveOrder(order: Order): Promise<void> {
  if (!token) {
    memStore[order.orderId] = order
    return
  }
  await put(`${ORDERS_PREFIX}${order.orderId}.json`, JSON.stringify(order), {
    access: "public",
    token,
    allowOverwrite: true,
  })
}

export async function createOrder(data: Omit<Order, "orderId" | "createdAt" | "status">): Promise<Order> {
  const order: Order = {
    ...data,
    orderId: generateOrderId(),
    createdAt: new Date().toISOString(),
    status: "pending_payment",
  }
  await saveOrder(order)
  return order
}

export async function getOrder(orderId: string): Promise<Order | null> {
  if (!token) return memStore[orderId] ?? null
  try {
    const { blobs } = await list({ prefix: `${ORDERS_PREFIX}${orderId}.json`, token })
    if (!blobs.length) return null
    const res = await fetch(blobs[0].url)
    return await res.json()
  } catch {
    return null
  }
}

export async function updateOrder(orderId: string, updates: Partial<Order>): Promise<Order | null> {
  const order = await getOrder(orderId)
  if (!order) return null
  const updated = { ...order, ...updates }
  await saveOrder(updated)
  return updated
}

export async function getAllOrders(): Promise<Order[]> {
  if (!token) {
    return Object.values(memStore).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
  try {
    const { blobs } = await list({ prefix: ORDERS_PREFIX, token })
    const orders: Order[] = []
    await Promise.all(
      blobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url)
          const order: Order = await res.json()
          orders.push(order)
        } catch {
          // skip corrupt blob
        }
      })
    )
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch {
    return []
  }
}
