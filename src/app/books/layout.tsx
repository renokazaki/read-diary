import { Header } from "@/components/layout/Header"

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8">{children}</main>
    </>
  )
}
