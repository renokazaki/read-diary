import { BookForm } from "@/components/books/BookForm"

export const metadata = {
  title: "本を追加 | 読書記録",
}

export default function NewBookPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">本を追加</h1>
      <BookForm />
    </div>
  )
}
