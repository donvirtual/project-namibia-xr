import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const auth = request.headers.get("authorization")
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const password = auth.replace("Bearer ", "").trim()
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim()
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (!token) return NextResponse.json({ leads: [] })

    const { blobs } = await list({ prefix: "leads/", token })
    const leads = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url)
          return await res.json()
        } catch {
          return null
        }
      })
    )
    const sorted = leads
      .filter(Boolean)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ leads: sorted })
  } catch {
    return NextResponse.json({ leads: [] })
  }
}
