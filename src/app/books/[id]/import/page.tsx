"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { KindleImport } from "@/components/memos/KindleImport"

interface ImportPageProps {
  params: Promise<{ id: string }>
}

export default function ImportPage({ params }: ImportPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [imported, setImported] = useState(false)

  const handleImported = (count: number) => {
    setImported(true)
    setTimeout(() => {
      router.push(`/books/${id}`)
      router.refresh()
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href={`/books/${id}`} className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        書籍詳細に戻る
      </Link>

      <h1 className="text-2xl font-bold">Kindleハイライトのインポート</h1>

      <KindleImport bookId={id} onImported={handleImported} />
    </div>
  )
}
