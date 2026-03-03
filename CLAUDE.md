# read-diary プロジェクト概要

## アプリ概要

読書記録アプリ。本の登録・管理と読書メモの記録ができる。KindleのエクスポートHTMLからハイライト・メモを一括インポートする機能も備える。

## 技術スタック

| カテゴリ | 使用技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router, Turbopack) |
| 言語 | TypeScript |
| DB | PostgreSQL (Neon サーバーレス) |
| ORM | Prisma 7 + @prisma/adapter-neon (HTTPモード) |
| UI | shadcn/ui + Tailwind CSS v4 |
| フォーム | react-hook-form + zod |
| HTMLパース | cheerio |

## 環境変数

```
DATABASE_URL="postgresql://..."  # Neon の接続URL（必須）
```

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx                          # ホーム
│   ├── books/
│   │   ├── page.tsx                      # 本一覧
│   │   ├── new/page.tsx                  # 本の新規追加
│   │   └── [id]/
│   │       ├── page.tsx                  # 本の詳細・メモ一覧
│   │       ├── edit/page.tsx             # 本の編集
│   │       └── import/page.tsx           # Kindleインポート
│   └── api/
│       ├── books/route.ts                # 本一覧・作成
│       ├── books/[id]/route.ts           # 本の取得・更新・削除
│       ├── books/[id]/memos/route.ts     # メモ取得・作成
│       ├── books/[id]/import-kindle/route.ts  # Kindleインポート処理
│       ├── google-books/route.ts         # Google Books API連携
│       └── memos/[memoId]/route.ts       # メモ更新・削除
├── components/
│   ├── books/        # BookCard, BookForm, BookSearch, StarRating, StatusBadge
│   ├── memos/        # MemoCard, MemoForm, MemoList, KindleImport
│   ├── layout/       # Header
│   └── ui/           # shadcn/ui コンポーネント群
└── lib/
    ├── prisma.ts         # Prismaクライアント (NeonHTTPアダプター)
    ├── kindle-parser.ts  # KindleエクスポートHTMLパーサー
    ├── google-books.ts   # Google Books API
    └── utils.ts          # ユーティリティ
```

## DBスキーマ

### Book
- `status`: `WANT_TO_READ` / `READING` / `FINISHED`
- Google Books連携で `coverImageUrl`, `googleBooksId`, `isbn` を自動取得可能

### Memo
- `source`: `MANUAL`（手動入力）/ `KINDLE_IMPORT`（インポート）
- Kindleインポート時は `location`, `chapter`, `color` も保存

## 重要な実装メモ

### Prisma (Neon HTTPモード)
- `createMany` はHTTPモードでトランザクション非対応 → `Promise.all` + 個別 `create` を使う
- `prisma generate` はVercelビルド時に `postinstall` スクリプトで実行する

### Kindleパーサー (`src/lib/kindle-parser.ts`)
- KindleエクスポートHTMLは壊れたタグ構造になっている場合がある
- `element.next()` でのDOM兄弟探索ではなく、ステートフルに `pendingHeading` を追跡して `.noteText` と紐付ける実装

### 画像
- Google Booksの画像ドメイン (`books.google.com`) を `next.config.ts` で許可済み
