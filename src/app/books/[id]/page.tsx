import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Pencil, BookOpen, Upload, ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/books/StatusBadge"
import { StarRating } from "@/components/books/StarRating"
import { MemoList } from "@/components/memos/MemoList"

interface BookDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params

  const book = await prisma.book.findUnique({
    where: { id },
    include: { memos: { orderBy: { createdAt: "asc" } } },
  })

  if (!book) notFound()

  const startDateStr = book.startDate
    ? new Date(book.startDate).toLocaleDateString("ja-JP")
    : null
  const endDateStr = book.endDate
    ? new Date(book.endDate).toLocaleDateString("ja-JP")
    : null

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back Link */}
      <Link href="/books" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        書籍一覧に戻る
      </Link>

      {/* Book Info */}
      <div className="flex gap-6">
        {/* Cover */}
        <div className="flex-shrink-0 w-24 h-36 relative rounded-lg overflow-hidden bg-gray-100 shadow">
          {book.coverImageUrl ? (
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h1 className="text-xl font-bold leading-tight">{book.title}</h1>
            <p className="text-[var(--muted-foreground)] mt-0.5">{book.author}</p>
          </div>

          <StatusBadge status={book.status} />

          {book.rating && <StarRating value={book.rating} readOnly />}

          {(startDateStr || endDateStr) && (
            <div className="text-sm text-[var(--muted-foreground)] space-y-0.5">
              {startDateStr && <p>開始: {startDateStr}</p>}
              {endDateStr && <p>読了: {endDateStr}</p>}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <Button asChild size="sm" variant="outline">
              <Link href={`/books/${book.id}/edit`}>
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                編集
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={`/books/${book.id}/import`}>
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Kindleインポート
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)]" />

      {/* Memos */}
      <div>
        <h2 className="text-lg font-semibold mb-4">メモ</h2>
        <MemoList initialMemos={book.memos} bookId={book.id} />
      </div>
    </div>
  )
}
