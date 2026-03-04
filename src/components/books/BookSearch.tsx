"use client"

import { useState, useCallback, useRef } from "react"
import { Search, Loader2 } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { GoogleBookResult } from "@/lib/google-books"

interface BookSearchProps {
  onSelect: (book: GoogleBookResult) => void
}

export function BookSearch({ onSelect }: BookSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GoogleBookResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setError(null)
      setOpen(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/google-books?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "検索に失敗しました")
        setResults([])
        setOpen(true)
        return
      }
      setResults(data.books ?? [])
      setOpen(true)
    } catch {
      setError("検索に失敗しました")
      setResults([])
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => search(value), 400)
  }

  const handleSelect = (book: GoogleBookResult) => {
    onSelect(book)
    setQuery("")
    setResults([])
    setOpen(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <Input
          value={query}
          onChange={handleChange}
          placeholder="タイトルや著者名で検索..."
          className="pl-9"
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-[var(--muted-foreground)]" />
        )}
      </div>

      {open && error && (
        <div className="absolute z-10 w-full mt-1 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg px-3 py-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {open && !error && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg max-h-80 overflow-y-auto">
          {results.map((book) => (
            <button
              key={book.googleBooksId}
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--accent)] text-left"
              onMouseDown={() => handleSelect(book)}
            >
              <div className="flex-shrink-0 w-8 h-12 relative rounded overflow-hidden bg-gray-100">
                {book.coverImageUrl ? (
                  <Image src={book.coverImageUrl} alt={book.title} fill className="object-cover" sizes="32px" unoptimized />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{book.title}</p>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{book.authors.join(", ")}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
