import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ memoId: string }> }
) {
  const { memoId } = await params
  const body = await request.json()
  const { content } = body

  if (!content?.trim()) {
    return NextResponse.json({ error: "content is required" }, { status: 400 })
  }

  const memo = await prisma.memo.update({
    where: { id: memoId },
    data: { content: content.trim() },
  })

  return NextResponse.json(memo)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ memoId: string }> }
) {
  const { memoId } = await params
  await prisma.memo.delete({ where: { id: memoId } })
  return NextResponse.json({ success: true })
}
