"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { BookOpen, Plus, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-9 w-9" />

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="テーマを切り替え"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/books"
          className="flex items-center gap-2 font-bold text-lg shrink-0 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary)]">
            <BookOpen className="h-4 w-4 text-[var(--primary-foreground)]" />
          </div>
          <span className="hidden sm:inline">読書記録</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/books/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">本を追加</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
