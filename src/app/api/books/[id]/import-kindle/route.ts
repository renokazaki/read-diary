import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { parseKindleHTML } from "@/lib/kindle-parser"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Verify book exists
  const book = await prisma.book.findUnique({ where: { id } })
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const htmlContent = await file.text()
  const highlights = parseKindleHTML(htmlContent)

  if (highlights.length === 0) {
    return NextResponse.json(
      { error: "No highlights found in file. Please check the file format." },
      { status: 400 }
    )
  }

  const created = await Promise.all(
    highlights.map((h) =>
      prisma.memo.create({
        data: {
          bookId: id,
          content: h.content,
          source: "KINDLE_IMPORT" as const,
          location: h.location,
          chapter: h.chapter,
          color: h.color,
        },
      })
    )
  )

  return NextResponse.json({
    message: `${created.length}件のハイライトをインポートしました`,
    count: created.length,
  })
}
