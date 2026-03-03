"use client"

import { useState } from "react"
import { Pencil, Trash2, BookMarked, User } from "lucide-react"
import { Memo } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface MemoCardProps {
  memo: Memo
  onDelete: (id: string) => void
  onUpdate: (id: string, content: string) => void
}

export function MemoCard({ memo, onDelete, onUpdate }: MemoCardProps) {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(memo.content)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) return
    setSaving(true)
    await onUpdate(memo.id, content.trim())
    setSaving(false)
    setEditing(false)
  }

  const handleCancel = () => {
    setContent(memo.content)
    setEditing(false)
  }

  return (
    <div className="group border border-[var(--border)] rounded-lg p-4 space-y-2">
      {/* Source badge + metadata */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {memo.source === "KINDLE_IMPORT" ? (
            <BookMarked className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
          ) : (
            <User className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
          )}
          <span className="text-xs text-[var(--muted-foreground)]">
            {memo.source === "KINDLE_IMPORT" ? "Kindleハイライト" : "手動メモ"}
          </span>
          {memo.chapter && (
            <span className="text-xs text-[var(--muted-foreground)]">· {memo.chapter}</span>
          )}
          {memo.location && (
            <span className="text-xs text-[var(--muted-foreground)]">· {memo.location}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-[var(--destructive)] hover:text-[var(--destructive)]"
            onClick={() => onDelete(memo.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {editing ? (
        <div className="space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px]"
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "保存中..." : "保存"}
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              キャンセル
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm whitespace-pre-wrap">{memo.content}</p>
      )}
    </div>
  )
}
