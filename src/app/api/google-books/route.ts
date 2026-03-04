import { NextRequest, NextResponse } from "next/server"
import { searchGoogleBooks } from "@/lib/google-books"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query?.trim()) {
    return NextResponse.json({ error: "q parameter is required" }, { status: 400 })
  }

  try {
    const books = await searchGoogleBooks(query.trim())
    return NextResponse.json({ books })
  } catch (error) {
    const message = error instanceof Error ? error.message : ""
    console.error("Google Books API error:", message)
    const userMessage =
      message.includes("Quota exceeded") || message.includes("rateLimitExceeded")
        ? "Google Books APIの利用上限に達しました。しばらく時間をおいて再度お試しください。"
        : "検索に失敗しました。しばらくしてから再試行してください。"
    return NextResponse.json({ error: userMessage }, { status: 503 })
  }
}
