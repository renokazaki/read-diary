import Link from "next/link"
import Image from "next/image"
import { BookOpen, FileText } from "lucide-react"
import { Book } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "./StatusBadge"
import { StarRating } from "./StarRating"

interface BookCardProps {
  book: Book & { _count?: { memos: number } }
}

export function BookCard({ book }: BookCardProps) {
  const formattedDate = book.endDate
    ? new Date(book.endDate).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })
    : null

  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex gap-3">
            {/* Cover Image */}
            <div className="flex-shrink-0 w-16 h-24 relative rounded overflow-hidden bg-gray-100">
              {book.coverImageUrl ? (
                <Image
                  src={book.coverImageUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">{book.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{book.author}</p>
              </div>

              <StatusBadge status={book.status} />

              {book.rating && (
                <StarRating value={book.rating} readOnly size="sm" />
              )}

              {formattedDate && (
                <p className="text-xs text-[var(--muted-foreground)]">読了: {formattedDate}</p>
              )}

              {book._count && (
                <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                  <FileText className="h-3 w-3" />
                  <span>{book._count.memos}件のメモ</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
