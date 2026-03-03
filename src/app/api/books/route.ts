import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ReadStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") as ReadStatus | null

  const books = await prisma.book.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { memos: true } } },
  })

  return NextResponse.json(books)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, author, coverImageUrl, googleBooksId, isbn, status, startDate, endDate, rating } = body

  if (!title || !author) {
    return NextResponse.json({ error: "title and author are required" }, { status: 400 })
  }

  if (rating !== undefined && rating !== null && (rating < 1 || rating > 5)) {
    return NextResponse.json({ error: "rating must be 1-5" }, { status: 400 })
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      coverImageUrl: coverImageUrl || null,
      googleBooksId: googleBooksId || null,
      isbn: isbn || null,
      status: status || "WANT_TO_READ",
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      rating: rating || null,
    },
  })

  return NextResponse.json(book, { status: 201 })
}
