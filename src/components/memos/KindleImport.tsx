"use client"

import { useState, useRef } from "react"
import { Upload, BookMarked, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface KindleImportProps {
  bookId: string
  onImported: (count: number) => void
}

export function KindleImport({ bookId, onImported }: KindleImportProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setResult(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && (f.name.endsWith(".html") || f.name.endsWith(".htm"))) {
      handleFile(f)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch(`/api/books/${bookId}/import-kindle`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (res.ok) {
        setResult({ success: true, message: data.message })
        onImported(data.count)
        setFile(null)
      } else {
        setResult({ success: false, message: data.error ?? "インポートに失敗しました" })
      }
    } catch {
      setResult({ success: false, message: "エラーが発生しました" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-[var(--muted-foreground)] space-y-1">
        <p className="font-medium text-[var(--foreground)]">Kindleハイライトのインポート方法:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Kindleアプリで対象の書籍を開く</li>
          <li>ノートブック画面を開き、「エクスポート」を選択</li>
          <li>HTMLファイルをダウンロード（または read.amazon.co.jp/notebook からエクスポート）</li>
          <li>下のエリアにファイルをアップロード</li>
        </ol>
      </div>

      {/* Drop Zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          dragging
            ? "border-[var(--primary)] bg-[var(--accent)]"
            : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--accent)]"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".html,.htm"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
        <BookMarked className="h-10 w-10 mx-auto text-[var(--muted-foreground)] mb-3" />
        {file ? (
          <div>
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">クリックして変更</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium">HTMLファイルをドラッグ＆ドロップ</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">またはクリックして選択</p>
          </div>
        )}
      </div>

      {file && (
        <Button onClick={handleImport} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              インポート中...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              インポートする
            </>
          )}
        </Button>
      )}

      {result && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-md text-sm",
            result.success
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-[var(--destructive)]"
          )}
        >
          {result.success ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  )
}
