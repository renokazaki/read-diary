import Link from "next/link"
import { BookOpen, Moon, ArrowRight, BookMarked, FileText, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: BookOpen,
    title: "書籍管理",
    description: "読みたい本・読んでいる本・読み終わった本をステータスで整理。表紙や評価も記録できます。",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    icon: FileText,
    title: "メモ管理",
    description: "本ごとに気づきや感想をメモとして残せます。後から見返してさらに学びを深めましょう。",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: Search,
    title: "Google Books連携",
    description: "タイトルや著者名で検索するだけで、書籍情報と表紙画像を自動入力。登録がスムーズ。",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/40",
  },
  {
    icon: BookMarked,
    title: "Kindleインポート",
    description: "Kindleのハイライトエクスポート（HTML）をアップロードして、一括でメモに取り込めます。",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/40",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
        <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary)]">
              <BookOpen className="h-4 w-4 text-[var(--primary-foreground)]" />
            </div>
            読書記録
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/books">ログイン</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/books">
                始める
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          {/* Gradient background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="container mx-auto max-w-4xl px-4 pt-24 pb-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-sm text-[var(--muted-foreground)] mb-8">
              <Zap className="h-3.5 w-3.5 text-[var(--primary)]" />
              シンプルで使いやすい読書記録アプリ
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
              読書習慣を、
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                もっとシンプルに。
              </span>
            </h1>

            <p className="text-lg text-[var(--muted-foreground)] max-w-xl mx-auto mb-10 leading-relaxed">
              読んだ本を記録し、気づきをメモし、Kindleのハイライトも一括インポート。
              あなたの読書体験をすべて一か所で管理します。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 h-12" asChild>
                <Link href="/books">
                  今すぐ始める
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12" asChild>
                <Link href="/books">ログイン</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="container mx-auto max-w-5xl px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">すべての機能がここに</h2>
            <p className="text-[var(--muted-foreground)]">
              読書記録に必要なものを、シンプルにまとめました。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="border-[var(--border)] hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${feature.bg}`}>
                      <Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container mx-auto max-w-5xl px-4 py-12 pb-24">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(124,58,237,0.08) 100%)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <Moon className="h-10 w-10 mx-auto mb-4 text-[var(--primary)]" />
            <h2 className="text-2xl font-bold mb-3">読書記録を始めましょう</h2>
            <p className="text-[var(--muted-foreground)] mb-6 max-w-sm mx-auto">
              無料で使えます。今日から読書記録を習慣にしましょう。
            </p>
            <Button size="lg" className="gap-2 px-8 h-11" asChild>
              <Link href="/books">
                無料で始める
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] py-6">
        <div className="container mx-auto max-w-5xl px-4 flex items-center justify-between text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            読書記録
          </div>
          <p>シンプルな読書管理アプリ</p>
        </div>
      </footer>
    </div>
  )
}
