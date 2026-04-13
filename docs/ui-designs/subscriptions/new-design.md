# サブスク画面（新デザイン）

---

## PC レイアウト（3カラム + TopBar）

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar  [サブスク]            [投稿ボタン]        │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  w-60        │  MainColumn (中央)        │  DetailPanel (右)      │
│              │  flex-1                   │  w-96                  │
│  ホーム      │                           │                        │
│  サブスク    │  StickyHeader             │  ActivityDetail        │
│  通知        │    "サブスク" + 件数       │  （ActivityCard クリック時）│
│  検索        │  SubscriptionFeed         │                        │
│  ─────────── │    ActivityCard × N       │  未選択時：            │
│  🎭 フェイスA │                           │  プレースホルダー       │
│  🏃 フェイスB │                           │                        │
│  ＋新規作成  │                           │                        │
└──────────────┴──────────────────────────┴────────────────────────┘
```

---

## 中央カラム（MainColumn）

### StickyHeader（変更なし）

```
<header>  sticky top-0 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <div>  flex items-center justify-between
    <h1>  "サブスク"  text-lg font-bold text-zinc-100
    "N フェイスをサブスク中"  text-xs text-zinc-500
```

### SubscriptionFeed の変更点

| 要素 | 変更前 | 変更後 |
|------|--------|--------|
| ActivityCard クリック | 展開のみ | PC：右パネルに ActivityDetail を表示 |
| 選択中カード | なし | `ring-1 ring-violet-500/40 bg-zinc-800` ハイライト |

---

## 右カラム（DetailPanel）

### ActivityDetail（ActivityCard クリック時）

共通コンポーネント（`shared/new-design.md` の ActivityDetail と同一）。

```
<div>  flex flex-col h-full
  [ヘッダー]  "アクティビティ詳細"  text-sm font-semibold text-zinc-400
  [本文エリア]
    ユーザー行（Avatar + 名前 + Badge）
    FaceChip（サブスク中のフェイス名）  + 日時
    全文（whitespace-pre-wrap）
    画像グリッド（あれば）
    [フェイスへのリンク]  text-xs text-violet-400 hover:text-violet-300
      "→ このフェイスを見る"  `/faces/{faceId}` へ遷移
```

### プレースホルダー（未選択時）

```
<div>  flex flex-col items-center justify-center h-full gap-3 px-8 text-center
  "📡"  text-4xl text-zinc-700
  "アクティビティを選択してください"  text-sm text-zinc-600
```

---

## FAB

- モバイルのみ表示（変更なし）。
- PC では SideNav の投稿ボタンを使用。

---

## モバイルレイアウト（変更なし）

- DetailPanel は非表示。
- ActivityCard の長文展開は現行通り。
