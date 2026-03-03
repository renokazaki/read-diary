import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const book = await prisma.book.findUnique({
    where: { id },
    include: { memos: { orderBy: { createdAt: "asc" } } },
  })

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { title, author, coverImageUrl, googleBooksId, isbn, status, startDate, endDate, rating } = body

  if (rating !== undefined && rating !== null && (rating < 1 || rating > 5)) {
    return NextResponse.json({ error: "rating must be 1-5" }, { status: 400 })
  }

  const book = await prisma.book.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(author !== undefined && { author }),
      ...(coverImageUrl !== undefined && { coverImageUrl: coverImageUrl || null }),
      ...(googleBooksId !== undefined && { googleBooksId: googleBooksId || null }),
      ...(isbn !== undefined && { isbn: isbn || null }),
      ...(status !== undefined && { status }),
      ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
      ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
      ...(rating !== undefined && { rating: rating || null }),
    },
  })

  return NextResponse.json(book)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.book.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
