# フェイス画面（新デザイン）

---

## PC の変更概要

**`/faces` はナビゲーションから削除。** PC ではフェイスへのアクセスを SideNav のフェイス一覧から行う。  
フェイス詳細は全ページ共通の **DetailPanel（右カラム）** に表示する。

---

## PC：SideNav からのフェイスアクセス

SideNav のフェイスリスト（FaceNavItem）をクリックすると、右の DetailPanel にフェイス詳細が表示される。  
ページ遷移なし。どのページを表示中でも右パネルが切り替わる。

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar                        [投稿ボタン]        │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  w-60        │  MainColumn (中央)        │  DetailPanel (右)      │
│              │  （現在表示中のページ）    │  w-96                  │
│  ホーム      │                           │                        │
│  サブスク    │                           │  FaceDetail            │
│  通知        │                           │  （フェイス選択時）     │
│  検索        │                           │                        │
│  ─────────── │                           │  未選択時：            │
│  🎭 フェイスA│◀ クリック                 │  プレースホルダー       │
│  🏃 フェイスB │                           │                        │
│  ＋新規作成  │                           │                        │
└──────────────┴──────────────────────────┴────────────────────────┘
```

### DetailPanel：FaceDetail

FaceNavItem クリック時に表示。

```
<div>  flex flex-col h-full overflow-y-auto
  [FaceHeader]  カバー画像 or 絵文字 + 名前 + 説明 + サブスクボタン
  [境界線]  border-b border-zinc-800
  [FaceActivityFeed]  px-4 py-4
    "このフェイスのアクティビティ"  text-xs font-semibold text-zinc-500 mb-3
    ActivityCard × N（クリックで DetailPanel の内容をアクティビティ詳細に置き換え）
```

### プレースホルダー（未選択時）

```
<div>  flex flex-col items-center justify-center h-full gap-3 px-8 text-center
  "🎭"  text-4xl text-zinc-700
  "フェイスを選択してください"  text-sm text-zinc-600
```

---

## PC：`/faces/[faceId]` ルート

> PC ではナビから直接アクセスする機会はなくなるが、URL で直接開いた場合は従来通りページとして表示する。  
> この場合も3カラム構成を維持し、ActivityCard クリックで右パネルにアクティビティ詳細を表示する。

```
┌──────────────┬────────────────────────────────────────────────────┐
│              │  TopBar                        [投稿ボタン]        │
│  SideNav     ├──────────────────────────┬────────────────────────┤
│  w-60        │  MainColumn (中央)        │  DetailPanel (右)      │
│              │                           │  w-96                  │
│              │  StickyHeader             │                        │
│              │    ← 戻る + フェイス名    │  ActivityDetail        │
│              │  FaceHeader               │  （ActivityCard 選択時）│
│              │  FaceActivityFeed         │                        │
│              │    ActivityCard × N       │  プレースホルダー       │
└──────────────┴──────────────────────────┴────────────────────────┘
```

---

## モバイルレイアウト（変更なし）

- BottomNav に「フェイス」タブを維持（モバイルは `/faces` ルートへ遷移）。
- `/faces` 一覧・FaceCard クリックでページ遷移・FAB は現行通り。

---

## CreateFaceModal（変更なし）

- PC：SideNav の「新規フェイス作成」ボタンからモーダルを開く。
- モバイル：FAB または `/faces` ページのヘッダーボタンから開く。
