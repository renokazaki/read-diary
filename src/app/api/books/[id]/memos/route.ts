import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const memos = await prisma.memo.findMany({
    where: { bookId: id },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json(memos)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { content } = body

  if (!content?.trim()) {
    return NextResponse.json({ error: "content is required" }, { status: 400 })
  }

  const memo = await prisma.memo.create({
    data: {
      bookId: id,
      content: content.trim(),
      source: "MANUAL",
    },
  })

  return NextResponse.json(memo, { status: 201 })
}
