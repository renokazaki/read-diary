"use client"

import { useState } from "react"
import { Memo } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface MemoFormProps {
  bookId: string
  onAdded: (memo: Memo) => void
}

export function MemoForm({ bookId, onAdded }: MemoFormProps) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/books/${bookId}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      })

      if (res.ok) {
        const memo = await res.json()
        onAdded(memo)
        setContent("")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="メモを入力..."
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={loading || !content.trim()}>
        {loading ? "追加中..." : "メモを追加"}
      </Button>
    </form>
  )
}
