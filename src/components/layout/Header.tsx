import Link from "next/link"
import { BookOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/books" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="h-5 w-5" />
          読書記録
        </Link>

        <Button asChild size="sm">
          <Link href="/books/new">
            <Plus className="h-4 w-4 mr-1" />
            本を追加
          </Link>
        </Button>
      </div>
    </header>
  )
}
