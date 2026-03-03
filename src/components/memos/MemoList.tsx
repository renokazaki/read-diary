"use client"

import { useState } from "react"
import { Memo } from "@prisma/client"
import { MemoCard } from "./MemoCard"
import { MemoForm } from "./MemoForm"

interface MemoListProps {
  initialMemos: Memo[]
  bookId: string
}

export function MemoList({ initialMemos, bookId }: MemoListProps) {
  const [memos, setMemos] = useState<Memo[]>(initialMemos)

  const handleAdded = (memo: Memo) => {
    setMemos((prev) => [...prev, memo])
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/memos/${id}`, { method: "DELETE" })
    if (res.ok) {
      setMemos((prev) => prev.filter((m) => m.id !== id))
    }
  }

  const handleUpdate = async (id: string, content: string) => {
    const res = await fetch(`/api/memos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
    if (res.ok) {
      const updated = await res.json()
      setMemos((prev) => prev.map((m) => (m.id === id ? updated : m)))
    }
  }

  const kindleMemos = memos.filter((m) => m.source === "KINDLE_IMPORT")
  const manualMemos = memos.filter((m) => m.source === "MANUAL")

  return (
    <div className="space-y-6">
      {/* Add Memo Form */}
      <div>
        <h3 className="text-base font-semibold mb-3">メモを追加</h3>
        <MemoForm bookId={bookId} onAdded={handleAdded} />
      </div>

      {/* Memo List */}
      {memos.length === 0 ? (
        <p className="text-sm text-[var(--muted-foreground)] py-4 text-center">
          まだメモがありません
        </p>
      ) : (
        <div className="space-y-6">
          {/* Manual Memos */}
          {manualMemos.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                手動メモ ({manualMemos.length}件)
              </h4>
              <div className="space-y-3">
                {manualMemos.map((memo) => (
                  <MemoCard
                    key={memo.id}
                    memo={memo}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Kindle Memos */}
          {kindleMemos.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">
                Kindleハイライト ({kindleMemos.length}件)
              </h4>
              <div className="space-y-3">
                {kindleMemos.map((memo) => (
                  <MemoCard
                    key={memo.id}
                    memo={memo}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
