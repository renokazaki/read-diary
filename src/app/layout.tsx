import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"

export const metadata: Metadata = {
  title: "読書記録",
  description: "読書習慣を記録・管理するWebアプリ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header />
        <main className="container mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
