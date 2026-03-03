import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    default: "読書記録",
    template: "%s | 読書記録",
  },
  description: "読書習慣をシンプルに管理。書籍・メモ・Kindleハイライトをまとめて記録。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
