import Link from "next/link"
import { BookOpen, ArrowRight, BookMarked, FileText, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: BookOpen,
    title: "書籍管理",
    description: "読みたい本・読んでいる本・読み終わった本をステータスで整理。表紙や評価も記録できます。",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: FileText,
    title: "メモ管理",
    description: "本ごとに気づきや感想をメモとして残せます。後から見返してさらに学びを深めましょう。",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Search,
    title: "Google Books連携",
    description: "タイトルや著者名で検索するだけで、書籍情報と表紙画像を自動入力。登録がスムーズ。",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    icon: BookMarked,
    title: "Kindleインポート",
    description: "Kindleのハイライトエクスポート（HTML）をアップロードして、一括でメモに取り込めます。",
    gradient: "from-orange-500 to-amber-500",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 4px 14px rgba(79,70,229,0.4)",
              }}
            >
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span>読書記録</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)]">
              <Link href="/books">ログイン</Link>
            </Button>
            <Button
              size="sm"
              asChild
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
              }}
            >
              <Link href="/books">
                始める
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 -z-10 landing-grid" />

          {/* Gradient glow — top center */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
            }}
          />
          {/* Glow — bottom left accent */}
          <div
            className="absolute bottom-0 left-1/4 w-[500px] h-[300px] -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)",
            }}
          />

          <div className="container mx-auto max-w-5xl px-6 pt-28 pb-24 text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8 tracking-wide"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#818cf8",
              }}
            >
              <Zap className="h-3 w-3" />
              Kindle インポート対応 · Google Books 連携
            </div>

            {/* Headline */}
            <h1
              className="font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: "1.05" }}
            >
              読書記録を、
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 45%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                もっと上質に。
              </span>
            </h1>

            <p className="text-lg text-[var(--muted-foreground)] max-w-lg mx-auto mb-12 leading-relaxed">
              読んだ本を記録し、気づきをメモし、Kindleのハイライトも一括インポート。
              <br />
              あなたの読書体験を、一か所ですべて管理。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 text-base px-8 h-12"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(79,70,229,0.35)",
                }}
                asChild
              >
                <Link href="/books">
                  今すぐ始める
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 h-12"
                asChild
              >
                <Link href="/books">ログイン</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="container mx-auto max-w-5xl px-6 py-24">
          <div className="text-center mb-16">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--primary)" }}
            >
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              必要な機能が、すべてここに
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xs mx-auto text-sm leading-relaxed">
              読書記録に必要なものを、シンプルにまとめました。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Top accent line on hover */}
                  <div
                    className="absolute top-0 inset-x-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="font-semibold text-base mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container mx-auto max-w-5xl px-6 pb-28">
          <div
            className="relative overflow-hidden rounded-3xl p-14 text-center"
            style={{
              background: "linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            {/* Glow inside CTA */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(99,102,241,0.25) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 8px 32px rgba(79,70,229,0.5)",
                }}
              >
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">
                読書記録を始めましょう
              </h2>
              <p className="mb-8 max-w-sm mx-auto text-sm leading-relaxed" style={{ color: "#a5b4fc" }}>
                無料で使えます。今日から読書記録を習慣にしましょう。
              </p>
              <Button
                size="lg"
                className="gap-2 px-10 h-12 text-base"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(99,102,241,0.45)",
                }}
                asChild
              >
                <Link href="/books">
                  無料で始める
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="container mx-auto max-w-6xl px-6 flex items-center justify-between text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-6 h-6 rounded-lg"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <BookOpen className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-[var(--foreground)]">読書記録</span>
          </div>
          <p>シンプルな読書管理アプリ</p>
        </div>
      </footer>
    </div>
  )
}
