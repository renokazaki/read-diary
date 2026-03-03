import Link from "next/link"
import Image from "next/image"
import { BookOpen, FileText, CalendarCheck } from "lucide-react"
import { Book } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "./StatusBadge"
import { StarRating } from "./StarRating"

interface BookCardProps {
  book: Book & { _count?: { memos: number } }
}

export function BookCard({ book }: BookCardProps) {
  const formattedDate = book.endDate
    ? new Date(book.endDate).toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" })
    : null

  return (
    <Link href={`/books/${book.id}`} className="block group">
      <Card className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5 border-[var(--border)] bg-[var(--card)]">
        <CardContent className="p-5">
          <div className="flex gap-4">
            {/* Cover Image */}
            <div className="flex-shrink-0 w-[60px] h-[88px] relative rounded-lg overflow-hidden bg-[var(--muted)] shadow-sm">
              {book.coverImageUrl ? (
                <Image
                  src={book.coverImageUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="60px"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-[var(--muted-foreground)] opacity-50" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-[var(--card-foreground)]">
                  {book.title}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5 truncate">{book.author}</p>
              </div>

              <StatusBadge status={book.status} />

              {book.rating && <StarRating value={book.rating} readOnly size="sm" />}

              <div className="flex items-center gap-3 mt-auto">
                {formattedDate && (
                  <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <CalendarCheck className="h-3 w-3" />
                    <span>{formattedDate}</span>
                  </div>
                )}
                {book._count && book._count.memos > 0 && (
                  <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <FileText className="h-3 w-3" />
                    <span>{book._count.memos}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
