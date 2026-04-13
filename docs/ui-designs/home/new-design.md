# ホーム画面（新デザイン）

---

## PC レイアウト（3カラム + TopBar）

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar  [ホーム]              [投稿ボタン]         │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  w-60        │  MainColumn (中央)        │  DetailPanel (右)      │
│              │  flex-1                   │  w-96                  │
│  ホーム      │                           │                        │
│  サブスク    │  StickyHeader "ホーム"     │  ActivityDetail        │
│  通知        │  HomeProfile              │  （カードクリック時）   │
│  検索        │  FaceFilterBar            │                        │
│  ─────────── │  ActivityFeed             │  未選択時：            │
│  🎭 フェイスA │    ActivityCard × N       │  プレースホルダー       │
│  🏃 フェイスB │                           │                        │
│  ＋新規作成  │                           │                        │
└──────────────┴──────────────────────────┴────────────────────────┘
```

---

## 中央カラム（MainColumn）

### 変更点

| 要素 | 変更前 | 変更後 |
|------|--------|--------|
| wrapper | `max-w-sm` に収まる幅 | `flex-1` で可変幅（SideNav/DetailPanel を除く全幅） |
| ActivityCard | クリックで展開のみ | PC：クリックで右パネルに詳細表示 |

### StickyHeader（変更なし）

```
<header>  sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <h1>  text-lg font-bold text-zinc-100  "ホーム"
```

### HomeProfile（変更なし）

```
<div>  flex flex-col gap-4 px-4 pt-6 pb-4
  アイコン行 / 統計行 / ActivityTileCalendar
```

### FaceFilterBar（変更なし）

横スクロール可能なフェイスフィルタ。

### ActivityFeed（PC 用変更）

- `ActivityCard` のクリックで右パネルに詳細を表示（ページ遷移しない）。
- 選択中のカードに `ring-1 ring-violet-500/40` のハイライトを付与。

---

## 右カラム（DetailPanel）

### ActivityDetail

ActivityCard クリック時に表示。

```
<div>  flex flex-col h-full
  [ヘッダー]  sticky top-0 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
    "アクティビティ詳細"  text-sm font-semibold text-zinc-400

  [本文エリア]  px-4 py-4 flex flex-col gap-4 overflow-y-auto
    [ユーザー・フェイス行]  flex items-center gap-3
      Avatar (md)
      ユーザー名 + Badge
      FaceChip + 日時
    [本文（全文展開）]  text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap
    [画像グリッド]  rounded-xl overflow-hidden（1枚 or 2カラム）
```

### プレースホルダー（未選択時）

```
<div>  flex flex-col items-center justify-center h-full gap-3 px-8 text-center
  "📝"  text-4xl text-zinc-700
  "アクティビティを選択してください"  text-sm text-zinc-600
```

---

## モバイルレイアウト（変更なし）

- SideNav, DetailPanel は非表示。
- ActivityCard のクリックは現行通り（長文展開のみ）。
- FAB は `fixed bottom-24 right-4`。
