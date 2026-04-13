# フェイス画面（`/faces` / `/faces/[faceId]`）

## 1. フェイス一覧（`/faces`）

### ページレイアウト構造

```
<main>  flex flex-col pb-6
  [StickyHeader]  flex items-center justify-between
    タイトル "フェイス"
    新規作成ボタン
  [グリッドエリア]  px-4 pt-4
    <div>  grid grid-cols-2 gap-3
      FaceCard × N
  <CreateFaceModal>  ← isOpen 時にオーバーレイ表示
```

### StickyHeader

```
<header>  sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <h1>  text-base font-bold text-zinc-100  "フェイス"
  [新規作成ボタン]
    flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5
    text-xs font-semibold text-white
    shadow-md shadow-violet-900/40
    hover:bg-violet-500 hover:shadow-violet-700/50
    active:scale-95 active:bg-violet-700
    + Plus アイコン 14px
```

### FaceCard（グリッドアイテム）

```
<a>  flex flex-col overflow-hidden rounded-xl bg-zinc-800/60
     transition-colors hover:bg-zinc-700/80 active:bg-zinc-700

  [カバーエリア]  aspect-video w-full
    画像あり: <Image> object-cover fill sizes="50vw or 200px"
    画像なし: bg-zinc-700/60 + 絵文字（テキスト text-4xl 中央配置）

  [カード本文]  flex flex-col gap-1 p-3
    [名前行]  flex items-center gap-1.5
      絵文字  text-base leading-none
      名前  truncate text-sm font-semibold text-zinc-100
    説明  line-clamp-2 text-xs text-zinc-400
    非公開バッジ  self-start rounded-full bg-zinc-700 px-2 py-0.5 text-[10px] text-zinc-400
```

### グリッドレイアウト

| 環境 | カラム数 | ギャップ |
|------|---------|---------|
| モバイル | 2 (`grid-cols-2`) | `gap-3` (12px) |
| PC | 2 (変わらず) | `gap-3` |

> PC で幅が広くなるとカードが大きくなるが、カラム数は変わらない。

### 空状態

```
<p>  py-12 text-center text-sm text-zinc-500  "フェイスがありません"
```

## 2. フェイス詳細（`/faces/[faceId]`）

### ページレイアウト構造

```
<div>  flex flex-col
  [StickyHeader]  ← 戻る矢印 + フェイス名
  <main>
    [FaceHeader]  ← カバー画像 or 絵文字 + 名前 + 説明 + サブスクボタン
    [FaceActivityFeed]  ← アクティビティ一覧
  <FAB />  ← 自分のフェイスのみ表示（モバイル）
```

### StickyHeader（詳細）

```
<header>  sticky top-0 z-10 flex items-center gap-2 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  [戻るボタン]  flex items-center justify-center rounded-full p-1 text-zinc-400
               hover:bg-zinc-800 hover:text-zinc-100
               SVG 矢印アイコン 20px
  <h2>  truncate text-base font-bold text-zinc-100 （絵文字 + 名前）
```

### FaceHeader（カバーあり）

```
<div>  relative aspect-video w-full overflow-hidden
  <Image>  object-cover fill sizes="100vw" priority
  [グラデーションオーバーレイ]  absolute inset-0
    bg-gradient-to-t from-black/80 via-black/40 to-transparent
  [コンテンツ層]  absolute inset-x-0 bottom-0
                 flex flex-col items-center gap-3 px-4 py-6 text-center
    絵文字  text-5xl leading-none
    [名前行]  flex items-center gap-2
      h1  text-2xl font-bold text-white
      非公開バッジ  rounded-full bg-black/40 px-2 py-0.5 text-xs text-white/80
    説明  max-w-xs text-sm text-white/80
    サブスクボタン（非オーナーのみ）
```

### FaceHeader（カバーなし）

```
<div>  flex flex-col gap-4 px-4 py-6
  [中央揃えエリア]  flex flex-col items-center gap-2 text-center
    絵文字  text-5xl leading-none
    [名前行]  flex items-center gap-2
      h1  text-2xl font-bold text-zinc-100
      非公開バッジ  rounded-full bg-zinc-700 px-2 py-0.5 text-xs text-zinc-400
    説明  max-w-xs text-sm text-zinc-400
  サブスクボタン（非オーナーのみ）  flex justify-center
```

### サブスクボタン

| 状態 | スタイル |
|------|---------|
| 未サブスク | `rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-500` |
| サブスク中 | `rounded-full bg-zinc-700 px-6 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-600` |
| テキスト | "サブスクする" / "✓ サブスク中" |

### FaceActivityFeed

```
<section>  px-4 py-4
  <ul>  flex flex-col gap-3
    <li> × N
      ui/ActivityCard
```

空状態：`py-16 text-center text-sm text-zinc-500`

## CreateFaceModal

### 外形・配置

POST モーダルと同じ `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` パターン。

```
[オーバーレイ]  fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
[モーダル本体]  w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-zinc-900 shadow-xl

  [ヘッダー]  flex items-center justify-between px-4 pt-4 pb-2
    "フェイスを作成"  text-base font-bold text-zinc-100
    閉じる×ボタン  h-8 w-8 rounded-full hover:bg-zinc-800

  [フォーム]  flex flex-col gap-4 px-4 pb-4 pt-2
    絵文字入力
    フェイス名（必須）
    説明（任意）
    非公開トグル
    作成ボタン  w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold
```

## モバイル / PC の差異

| 要素 | モバイル | PC（md:） |
|------|---------|---------|
| グリッド | 2カラム | 2カラム（カード幅が広くなる） |
| カバー画像アスペクト | aspect-video (16:9) | aspect-video |
| FAB | 表示 | 非表示 |
| CreateFaceModal | センター固定 | センター固定 |
