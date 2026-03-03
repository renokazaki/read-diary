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

  // Iterate over all relevant divs in document order
  $("div.sectionHeading, div.noteHeading, div.noteText").each((_, el) => {
    const element = $(el)
    const className = element.attr("class") ?? ""

    if (className.includes("sectionHeading")) {
      currentChapter = element.text().replace(/·\s*$/, "").trim()
      return
    }

    if (className.includes("noteHeading")) {
      const headingText = element.text()

      // Extract color from span class like highlight_yellow
      const colorSpan = element.find("span[class^='highlight_']")
      const color =
        colorSpan.length > 0
          ? colorSpan.attr("class")?.replace("highlight_", "") ?? null
          : null

      // Extract location number
      const locationMatch = headingText.match(/Location\s+[\d,]+|ページ\s*\d+/i)
      const location = locationMatch ? locationMatch[0].trim() : null

      // Determine if it's a user note vs. highlight
      const isNote = /^Note\s*-|^ノート\s*-/i.test(headingText.trim())

      // Next sibling div.noteText holds the content
      const nextNoteText = element.next("div.noteText")
      if (nextNoteText.length > 0) {
        const content = nextNoteText.text().trim()
        if (content) {
          highlights.push({ content, chapter: currentChapter, location, color, isNote })
        }
      }
    }
  })

  return highlights
}
