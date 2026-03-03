import { NextRequest, NextResponse } from "next/server"
import { searchGoogleBooks } from "@/lib/google-books"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query?.trim()) {
    return NextResponse.json({ error: "q parameter is required" }, { status: 400 })
  }

  const books = await searchGoogleBooks(query.trim())
  return NextResponse.json({ books })
}
