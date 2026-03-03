import Link from "next/link"
import { BookOpen, Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { ReadStatus } from "@prisma/client"
import { BookCard } from "@/components/books/BookCard"
import { Button } from "@/components/ui/button"

const STATUS_TABS: { value: ReadStatus | "ALL"; label: string; count?: number }[] = [
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
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">書籍一覧</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {books.length} 冊
          </p>
        </div>
        <Button asChild className="gap-1.5 shadow-sm">
          <Link href="/books/new">
            <Plus className="h-4 w-4" />
            本を追加
          </Link>
        </Button>
      </div>

      {/* Status filter — pill style */}
      <div className="flex gap-1.5 flex-wrap">
        {STATUS_TABS.map((tab) => {
          const isActive =
            tab.value === "ALL" ? !activeStatus : activeStatus === tab.value
          const href =
            tab.value === "ALL" ? "/books" : `/books?status=${tab.value}`
          return (
            <Link
              key={tab.value}
              href={href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white shadow-sm"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
              style={
                isActive
                  ? {
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
                    }
                  : {}
              }
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {/* Book grid */}
      {books.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ background: "var(--muted)" }}
          >
            <BookOpen className="h-8 w-8 text-[var(--muted-foreground)]" />
          </div>
          <p className="text-[var(--muted-foreground)] mb-6 text-sm">
            {activeStatus ? "該当する書籍がありません" : "まだ書籍が登録されていません"}
          </p>
          <Button asChild className="gap-1.5">
            <Link href="/books/new">
              <Plus className="h-4 w-4" />
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
