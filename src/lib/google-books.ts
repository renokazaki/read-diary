export interface GoogleBookResult {
  googleBooksId: string
  title: string
  authors: string[]
  coverImageUrl: string | null
  isbn: string | null
  publishedDate: string | null
}

export async function searchGoogleBooks(query: string): Promise<GoogleBookResult[]> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY
  const keyParam = apiKey ? `&key=${apiKey}` : ""
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&langRestrict=ja${keyParam}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      body?.error?.message ?? `Google Books API error: ${res.status}`
    )
  }

  const data = await res.json()

  return (data.items ?? []).map((item: {
    id: string
    volumeInfo?: {
      title?: string
      authors?: string[]
      imageLinks?: { thumbnail?: string; smallThumbnail?: string }
      industryIdentifiers?: { type: string; identifier: string }[]
      publishedDate?: string
    }
  }) => ({
    googleBooksId: item.id,
    title: item.volumeInfo?.title ?? "",
    authors: item.volumeInfo?.authors ?? [],
    coverImageUrl:
      item.volumeInfo?.imageLinks?.thumbnail?.replace("http://", "https://") ??
      item.volumeInfo?.imageLinks?.smallThumbnail?.replace("http://", "https://") ??
      null,
    isbn:
      item.volumeInfo?.industryIdentifiers?.find(
        (id: { type: string }) => id.type === "ISBN_13"
      )?.identifier ?? null,
    publishedDate: item.volumeInfo?.publishedDate ?? null,
  }))
}
