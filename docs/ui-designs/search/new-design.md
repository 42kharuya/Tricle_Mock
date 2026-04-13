# 検索画面（新デザイン）

---

## PC レイアウト（3カラム + TopBar）

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar  [検索]                [投稿ボタン]        │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  w-60        │  MainColumn (中央)        │  DetailPanel (右)      │
│              │  flex-1                   │  w-96                  │
│  ホーム      │                           │                        │
│  サブスク    │  StickyHeader             │  FaceDetail            │
│  通知        │    h1 "検索"              │  or ActivityDetail     │
│  検索        │    SearchBar              │  （行クリック時）       │
│  ─────────── │    SearchScopeSelector    │                        │
│  🎭 フェイスA │  SearchResults            │  未選択時：            │
│  🏃 フェイスB │    フェイス行 × N         │  プレースホルダー       │
│  ＋新規作成  │    ActivityCard × N       │                        │
└──────────────┴──────────────────────────┴────────────────────────┘
```

---

## 中央カラム（MainColumn）

### StickyHeader（変更なし）

```
<header>  sticky top-0 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <h1>  mb-3 text-lg font-bold text-zinc-100  "検索"
  SearchBar
  SearchScopeSelector
```

### SearchResults の変更点

| 要素 | 変更前 | 変更後 |
|------|--------|--------|
| フェイス行クリック | 何も起きない（disabled ボタンのみ） | PC：右パネルに FaceDetail を表示 |
| ActivityCard クリック | 展開のみ | PC：右パネルに ActivityDetail を表示 |
| フェイス行 hover | `hover:bg-zinc-800` | `hover:bg-zinc-800 cursor-pointer` |

---

## 右カラム（DetailPanel）

### FaceDetail（フェイス行クリック時）

```
<div>  flex flex-col h-full overflow-y-auto
  [FaceHeader]  カバー画像 or 絵文字 + 名前 + 説明 + サブスクボタン
  [FaceActivityFeed]  px-4 py-4
    ActivityCard × N
```

### ActivityDetail（ActivityCard クリック時）

共通コンポーネント（`shared/new-design.md` の ActivityDetail と同一）。

### プレースホルダー（未選択時 / クエリ未入力時）

```
<div>  flex flex-col items-center justify-center h-full gap-3 px-8 text-center
  "🔍"  text-4xl text-zinc-700
  "検索結果から選択してください"  text-sm text-zinc-600
```

---

## モバイルレイアウト（変更なし）

- DetailPanel は非表示。
- フェイス行クリックで `/faces/{id}` へページ遷移（現行通り）。
