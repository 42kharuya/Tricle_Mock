# サブスク画面（`/subscriptions`）

## 概要

currentUser がサブスクライブしているフェイスのアクティビティを  
時系列降順（最新が先頭）で表示するフィード画面。

## ページレイアウト構造

```
<div>  flex flex-col
  [StickyHeader]
  <main>  px-4 py-4
    SubscriptionFeed
  <FAB />  ← モバイルのみ（defaultFaceId なし）
```

## StickyHeader

```
<header>  sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <div>  flex items-center justify-between
    <h1>  text-lg font-bold text-zinc-100  "サブスク"
    件数テキスト  text-xs text-zinc-500  "N フェイスをサブスク中"
```

## SubscriptionFeed

### サブスクあり（フィード表示）

```
<ul>  flex flex-col gap-3
  <li> × N
    ui/ActivityCard
      activity
      user（投稿者情報）
      faceTitle（"絵文字 フェイス名" 形式）
      faceId
```

ActivityCard の表示内容はホーム・検索と同一（`ui/ActivityCard` を共有）。

### サブスクなし（空状態）

```
<div>  flex flex-col items-center gap-4 py-20 text-center
  絵文字  "🔔"  text-4xl
  説明文  text-sm text-zinc-400  "まだサブスクしているフェイスがありません"
  [検索へリンクボタン]
    rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white
    transition hover:bg-violet-500 active:bg-violet-700
    "検索してフェイスを探す" → `/search` へ遷移
```

## FAB

- `defaultFaceId` なしで表示（フェイスを選ばせる）
- モバイルのみ表示（BottomNav の上 / `bottom-24 right-4`）

## モバイル / PC の差異

| 要素 | モバイル | PC（md:） |
|------|---------|---------|
| フィード | 縦積み 1カラム | 縦積み 1カラム |
| サブスク件数 | ヘッダー右に表示 | ヘッダー右に表示 |
| FAB | 表示 | 非表示 |
| 空状態リンク | 表示 | 表示 |

## 問題点・改善余地メモ（現状把握）

- サブスクライブしたフェイスの一覧（サムネイル + 名前の横スクロール）がない
- フィードにどのフェイスかを示すセクション区切りがない（全アクティビティが混在）
- サブスク解除 UI がない（FaceChip / FaceHeader からのみ操作想定）
- フィルタ機能なし（サブスク中フェイスでの絞り込みができない）
