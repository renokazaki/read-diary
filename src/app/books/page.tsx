import Link from "next/link"
import { BookOpen, Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { ReadStatus } from "@prisma/client"
import { BookCard } from "@/components/books/BookCard"
import { Button } from "@/components/ui/button"

const STATUS_TABS: { value: ReadStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "すべて" },
  { value: "WANT_TO_READ", label: "読みたい" },
  { value: "READING", label: "読んでいる" },
  { value: "FINISHED", label: "読み終わった" },
]

interface BooksPageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { status } = await searchParams
  const activeStatus = status as ReadStatus | undefined

  const books = await prisma.book.findMany({
    where: activeStatus ? { status: activeStatus } : undefined,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { memos: true } } },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">書籍一覧</h1>
        <Button asChild>
          <Link href="/books/new">
            <Plus className="h-4 w-4 mr-1" />
            本を追加
          </Link>
        </Button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {STATUS_TABS.map((tab) => {
          const isActive =
            tab.value === "ALL" ? !activeStatus : activeStatus === tab.value
          const href =
            tab.value === "ALL" ? "/books" : `/books?status=${tab.value}`
          return (
            <Link
              key={tab.value}
              href={href}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-[var(--primary)] text-[var(--foreground)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {/* Book Grid */}
      {books.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 mx-auto text-[var(--muted-foreground)] mb-4" />
          <p className="text-[var(--muted-foreground)] mb-4">
            {activeStatus ? "該当する書籍がありません" : "まだ書籍が登録されていません"}
          </p>
          <Button asChild>
            <Link href="/books/new">
              <Plus className="h-4 w-4 mr-1" />
              最初の本を追加する
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
