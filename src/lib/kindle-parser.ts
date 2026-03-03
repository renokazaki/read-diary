import * as cheerio from "cheerio"

export interface KindleHighlight {
  content: string
  chapter: string | null
  location: string | null
  color: string | null
  isNote: boolean
}

export function parseKindleHTML(htmlContent: string): KindleHighlight[] {
  const $ = cheerio.load(htmlContent)
  const highlights: KindleHighlight[] = []
  let currentChapter: string | null = null
  let pendingHeading: { color: string | null; location: string | null; isNote: boolean } | null = null

  // Use class-based selectors (not element-type specific) for h2/h3/div compatibility.
  // Stateful approach: track the last seen noteHeading and pair it with the next noteText.
  // This handles Kindle's malformed HTML where noteHeading and noteText are not proper siblings.
  $(".sectionHeading, .noteHeading, .noteText").each((_, el) => {
    const element = $(el)
    const className = element.attr("class") ?? ""

    if (className.includes("sectionHeading")) {
      currentChapter = element.text().replace(/·\s*$/, "").trim()
      pendingHeading = null
      return
    }

    if (className.includes("noteHeading")) {
      const headingText = element.text()

      // Extract color from span class like highlight_yellow / highlight_pink
      const colorSpan = element.find("span[class^='highlight_']")
      const color =
        colorSpan.length > 0
          ? colorSpan.attr("class")?.replace("highlight_", "") ?? null
          : null

      // Extract location: Japanese "位置No. 3402", English "Location 3402", or "434ページ"
      const locationMatch = headingText.match(/位置No\.\s*[\d,]+|Location\s+[\d,]+|\d+\s*ページ/i)
      const location = locationMatch ? locationMatch[0].trim() : null

      // Determine if it's a user note vs. highlight
      const isNote = /^Note\b|^ノート/i.test(headingText.trim())

      pendingHeading = { color, location, isNote }
      return
    }

    if (className.includes("noteText") && pendingHeading) {
      const content = element.text().trim()
      if (content) {
        highlights.push({ content, chapter: currentChapter, ...pendingHeading })
      }
      pendingHeading = null
    }
  })

  return highlights
}