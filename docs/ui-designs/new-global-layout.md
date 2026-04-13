# グローバルレイアウト（新デザイン）

## 概要

PC は画面全体を3カラムで使い切る。SideNav（左）・メインコンテンツ（中央）・ディテールパネル（右）の3分割。  
モバイルは現状と同じ BottomNav + 中央1カラム構成を維持する。

---

## PC レイアウト（md: 以上）

### カラム構成

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar（MainColumn + DetailPanel の共通上部バー）  │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  (left)      │  MainColumn (center)     │  DetailPanel (right)   │
│  w-60 / 240px│  flex-1 / min-w-0        │  w-96 / 384px          │
│  shrink-0    │  overflow-y-auto         │  overflow-y-auto       │
│  sticky/100vh│  border-r border-zinc-800│                        │
└──────────────┴──────────────────────────┴────────────────────────┘
```

| 要素 | 幅 | クラス（案） | 役割 |
|------|-----|------------|------|
| 左：SideNav | 240px 固定 | `w-60 shrink-0 sticky top-0 h-screen` | グローバルナビ + フェイス一覧 |
| 右ブロック全体 | 残り全幅 | `flex flex-col flex-1 min-w-0` | TopBar + 中央/右カラムをまとめるラッパー |
| 上：TopBar | 右ブロック全幅 | `hidden md:flex items-center sticky top-0 z-10 h-12 border-b border-zinc-800` | 投稿ボタン等のグローバルアクション |
| 中央：MainColumn | flex-1 | `flex-1 min-w-0 border-r border-zinc-800 overflow-y-auto` | フィード・一覧・検索結果 |
| 右：DetailPanel | 384px 固定 | `w-96 shrink-0 overflow-y-auto` | 中央で選択したアイテムの詳細 |

- **`max-w` 制約を撤廃**し、`w-full` で画面全体を使用する。
- `wrapper` は `flex min-h-screen w-full`（幅上限なし）。

### 構造ツリー

```
<body>  bg-zinc-950 text-zinc-100
  <div>  flex min-h-screen w-full
    <SideNav />                        ← 左カラム（常時表示）
    <div>  flex flex-col flex-1 min-w-0
      <TopBar />                       ← 中央+右カラム共通の上部バー（投稿ボタン）
      <div>  flex flex-1 overflow-hidden
        <main>  flex-1 overflow-y-auto border-r border-zinc-800
          {children}                   ← 中央カラム
        </main>
        <DetailPanel />                ← 右カラム（選択状態に応じて内容が変わる）
      </div>
    </div>
  </div>
  BottomNav は md: 以上では hidden
```

---

## モバイルレイアウト（変更なし）

| 要素 | スタイル | 補足 |
|------|---------|------|
| wrapper | `flex min-h-screen w-full` | 幅上限なし（モバイルはブラウザ幅に追従） |
| main | `flex-1 min-w-0 pb-16` | pb-16 で BottomNav 分のスペース確保 |
| SideNav | `hidden`（非表示） | |
| DetailPanel | `hidden`（非表示） | |
| BottomNav | `fixed bottom-0 z-50` | 常時表示 |
| FAB | `fixed bottom-24 right-4 z-40` | BottomNav と重ならない位置 |

---

## DetailPanel の仕様

### 状態管理

- 中央カラムでアイテムをクリックすると、右パネルにそのアイテムの詳細を表示する。
- 未選択時はプレースホルダー（"アイテムを選択してください" 等）を表示する。
- 状態は URL search params（例：`?detail=activityId`）または Context で管理する。

### 表示内容（ページごと）

| ページ / 操作 | 中央カラムの操作 | 右パネルの表示内容 |
|--------------|----------------|------------------|
| **SideNav** | FaceNavItem をクリック | フェイス詳細（FaceHeader + FaceActivityFeed） |
| ホーム | ActivityCard をクリック | アクティビティ全文 + 画像 + フェイス情報 |
| フェイス詳細（直URL） | ActivityCard をクリック | アクティビティ全文 + 画像 |
| サブスク | ActivityCard をクリック | アクティビティ全文 + 画像 + フェイス情報 |
| 検索 | フェイス行をクリック | フェイス詳細 |
| 検索 | ActivityCard をクリック | アクティビティ全文 + 画像 |
| 通知 | 通知アイテムをクリック | 対象アクティビティの全文 |

### 未選択時のプレースホルダー

```
<div>  flex flex-col items-center justify-center h-full gap-3 text-center px-8
  絵文字 or アイコン  text-4xl text-zinc-700
  説明文  text-sm text-zinc-600  "← 左のリストから選択してください"
```

### スクロール制御

- 中央カラム・右パネルそれぞれ**独立してスクロール可能**。
- SideNav は `sticky top-0 h-screen overflow-y-auto`（左カラムも独立スクロール）。

---

## SideNav（PC 新デザイン）の変更点

| 変更前 | 変更後 |
|--------|--------|
| `w-56`（224px） | `w-60`（240px） |
| `max-w-4xl` wrapper 内で左端 | `w-full` wrapper 内で左端（画面端に接する） |
| アプリ名 "Tricle_Mock" | アプリ名 "MultiFace" に更新 |
| ナビタブに「フェイス」あり | ナビタブから「フェイス」を削除（4タブ構成） |
| 投稿ボタンが `mt-auto` で最下部 | 投稿ボタンを TopBar へ移動。代わりにフェイス一覧 + 新規作成ボタンを表示 |

---

## TopBar（新規コンポーネント）

**表示条件：** PC のみ（`hidden md:flex`）。MainColumn + DetailPanel の上端に固定。

### レイアウト

```
<header>  hidden md:flex items-center justify-between
          sticky top-0 z-10 h-12
          border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm
          px-4
  [左側]  現在のページ名（任意・省略可）  text-sm font-semibold text-zinc-400
  [右側]  [投稿ボタン]
            flex items-center gap-2 rounded-full bg-violet-600 px-4 py-1.5
            text-sm font-semibold text-white
            hover:bg-violet-500 active:scale-95 active:bg-violet-700
            + Pencil アイコン 16px
            クリックで PostModal を開く
```

| プロパティ | 値 |
|-----------|-----|
| 高さ | `h-12` (48px) |
| 背景 | `bg-zinc-950/80 backdrop-blur-sm` |
| 下ボーダー | `border-b border-zinc-800` |
| z-index | `z-10`（StickyHeader と同層） |
| 投稿ボタン | `bg-violet-600 rounded-full`、Pencil アイコン付き |

---

## 色トークン（変更なし）

現状の `current-global-layout.md` の色トークンをそのまま引き継ぐ。  
CSS変数化（`globals.css` への移行）は別タスクで対応。
