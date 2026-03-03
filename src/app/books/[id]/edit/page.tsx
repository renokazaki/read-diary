import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { BookForm } from "@/components/books/BookForm"

interface EditBookPageProps {
  params: Promise<{ id: string }>
}

export const metadata = {
  title: "書籍を編集 | 読書記録",
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params
  const book = await prisma.book.findUnique({ where: { id } })

  if (!book) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">書籍を編集</h1>
      <BookForm book={book} />
    </div>
  )
}
