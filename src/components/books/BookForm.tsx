"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Book, ReadStatus } from "@prisma/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookSearch } from "./BookSearch"
import { StarRating } from "./StarRating"
import { GoogleBookResult } from "@/lib/google-books"

interface BookFormProps {
  book?: Book
}

function toDateInputValue(date: Date | null | undefined): string {
  if (!date) return ""
  return new Date(date).toISOString().split("T")[0]
}

export function BookForm({ book }: BookFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState(book?.title ?? "")
  const [author, setAuthor] = useState(book?.author ?? "")
  const [coverImageUrl, setCoverImageUrl] = useState(book?.coverImageUrl ?? "")
  const [googleBooksId, setGoogleBooksId] = useState(book?.googleBooksId ?? "")
  const [isbn, setIsbn] = useState(book?.isbn ?? "")
  const [status, setStatus] = useState<ReadStatus>(book?.status ?? "WANT_TO_READ")
  const [startDate, setStartDate] = useState(toDateInputValue(book?.startDate))
  const [endDate, setEndDate] = useState(toDateInputValue(book?.endDate))
  const [rating, setRating] = useState<number | null>(book?.rating ?? null)

  const handleGoogleBooksSelect = (result: GoogleBookResult) => {
    setTitle(result.title)
    setAuthor(result.authors.join(", "))
    setCoverImageUrl(result.coverImageUrl ?? "")
    setGoogleBooksId(result.googleBooksId)
    setIsbn(result.isbn ?? "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("タイトルは必須です")
      return
    }

    setLoading(true)
    try {
      const payload = {
        title: title.trim(),
        author: author.trim(),
        coverImageUrl: coverImageUrl.trim() || null,
        googleBooksId: googleBooksId || null,
        isbn: isbn || null,
        status,
        startDate: startDate || null,
        endDate: endDate || null,
        rating,
      }

      const res = await fetch(
        book ? `/api/books/${book.id}` : "/api/books",
        {
          method: book ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "エラーが発生しました")
        return
      }

      const data = await res.json()
      toast.success(book ? "書籍を更新しました" : "書籍を登録しました")
      router.push(`/books/${book?.id ?? data.id}`)
      router.refresh()
    } catch {
      setError("エラーが発生しました")
      toast.error("エラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Google Books Search */}
      <div className="space-y-2">
        <Label>Google Booksで検索</Label>
        <BookSearch onSelect={handleGoogleBooksSelect} />
        <p className="text-xs text-[var(--muted-foreground)]">
          検索して選択すると、情報が自動入力されます
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Title */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">タイトル *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="書籍タイトル"
            required
          />
        </div>

        {/* Author */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="author">著者</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="著者名"
          />
        </div>

        {/* Cover Image URL */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="coverImageUrl">表紙画像URL</Label>
          <Input
            id="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>ステータス</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as ReadStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WANT_TO_READ">読みたい</SelectItem>
              <SelectItem value="READING">読んでいる</SelectItem>
              <SelectItem value="FINISHED">読み終わった</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label>評価</Label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate">読み始めた日</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDate">読み終わった日</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-sm text-[var(--destructive)]">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "保存中..." : book ? "更新する" : "登録する"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          キャンセル
        </Button>
      </div>
    </form>
  )
}
