import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 15MB)" }, { status: 400 })
  }

  const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return NextResponse.json({ url: blob.url })
}
