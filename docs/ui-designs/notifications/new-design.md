# 通知画面（新デザイン）

---

## PC レイアウト（3カラム + TopBar）

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar  [通知]                [投稿ボタン]        │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  w-60        │  MainColumn (中央)        │  DetailPanel (右)      │
│              │  flex-1                   │  w-96                  │
│  ホーム      │                           │                        │
│  サブスク    │  StickyHeader             │  ActivityDetail        │
│  通知        │    "通知" + 件数           │  （通知アイテムクリック時）│
│  検索        │  NotificationList         │                        │
│  ─────────── │    NotificationItem × N   │  未選択時：            │
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
    <h1>  "通知"  text-lg font-bold text-zinc-100
    件数  text-xs text-zinc-500
```

### NotificationItem の変更点

| 要素 | 変更前 | 変更後 |
|------|--------|--------|
| クリック動作 | なし（静的） | PC：右パネルに対象アクティビティの詳細を表示 |
| カーソル | デフォルト | PC：`cursor-pointer` |
| 選択中スタイル | なし | `ring-1 ring-violet-500/40 bg-zinc-800` |

---

## 右カラム（DetailPanel）

### ActivityDetail（通知アイテムクリック時）

通知に紐づくアクティビティを表示。  
共通コンポーネント（`shared/new-design.md` の ActivityDetail と同一）。

```
<div>  flex flex-col h-full
  [ヘッダー]  "アクティビティ詳細"  text-sm font-semibold text-zinc-400
  [本文エリア]
    ユーザー行（Avatar + 名前 + Badge + FaceChip + 日時）
    全文（whitespace-pre-wrap）
    画像グリッド（あれば）
```

### プレースホルダー（未選択時）

```
<div>  flex flex-col items-center justify-center h-full gap-3 px-8 text-center
  "🔔"  text-4xl text-zinc-700
  "通知を選択してください"  text-sm text-zinc-600
```

---

## モバイルレイアウト（変更なし）

- DetailPanel は非表示。
- 通知アイテムクリック時の挙動は現行通り（何も起きない）。
