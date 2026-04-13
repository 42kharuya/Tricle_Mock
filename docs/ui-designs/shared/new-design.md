# 共通 UI コンポーネント（新デザイン）

---

## SideNav（新デザイン）

**変更点：** 幅拡大 / アプリ名修正 / facesタブ削除 / フェイス一覧追加 / 投稿ボタンをTopBarへ移動

### レイアウト

```
<nav>  hidden md:flex flex-col w-60 shrink-0 sticky top-0 h-screen
       overflow-y-auto pt-6 pb-6 px-3
       border-r border-zinc-800
  [ロゴ]              px-3 pb-4
  [ナビリスト]         flex flex-col gap-1
    <li> × 4 （ホーム / サブスク / 通知 / 検索）
  [区切り線]           my-3 border-t border-zinc-800
  [フェイス一覧ラベル]  px-3 mb-1  text-[10px] font-semibold uppercase tracking-wider text-zinc-600
  [フェイスリスト]      flex flex-col gap-0.5
    FaceNavItem × N
  [新規フェイス作成]    mt-2 px-1
```

### ナビタブ一覧（4本・facesを削除）

| ラベル | パス | アイコン |
|--------|------|--------|
| ホーム | `/` | Home |
| サブスク | `/subscriptions` | Rss |
| 通知 | `/notifications` | Bell |
| 検索 | `/search` | Search |

> **「フェイス」タブは削除。** フェイスへのアクセスはサイドナビ下部のフェイス一覧から行う。

### フェイスリスト（FaceNavItem）

ナビリストの下、区切り線より下に配置。

```
<ul>  flex flex-col gap-0.5
  <li> × N  ← currentUserのフェイス数分
    <button>  flex items-center gap-2.5 w-full rounded-xl px-3 py-2
              text-sm font-medium transition-all duration-200
              text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100
              アクティブ時: bg-violet-500/20 text-violet-400
      [絵文字 or 頭文字]
        絵文字あり: <span>  text-base leading-none
        絵文字なし: <span>  flex h-6 w-6 items-center justify-center
                           rounded-full bg-zinc-700 text-xs font-bold text-zinc-300
      [フェイス名]  truncate text-sm
```

| プロパティ | 値 |
|-----------|-----|
| アイテム高さ | `py-2`（最低 36px） |
| 通常テキスト | `text-zinc-400` |
| hover | `hover:bg-zinc-800 hover:text-zinc-100` |
| アクティブ（詳細表示中） | `bg-violet-500/20 text-violet-400` |

### 新規フェイス作成ボタン

フェイスリストの直下に配置。

```
<button>  flex items-center gap-2 w-full rounded-xl px-3 py-2 mt-2
          text-sm font-medium text-zinc-500
          hover:bg-zinc-800 hover:text-zinc-300
          border border-dashed border-zinc-700
  <Plus size={14} />
  "新規フェイス作成"
```

| プロパティ | 値 |
|-----------|-----|
| スタイル | 破線ボーダー `border-dashed border-zinc-700` で他のアイテムと区別 |
| テキスト | `text-sm text-zinc-500` |
| クリック | CreateFaceModal を開く |

### 変更箇所まとめ

| 要素 | 変更前 | 変更後 |
|------|--------|--------|
| 幅 | `w-56` (224px) | `w-60` (240px) |
| ロゴテキスト | "Tricle_Mock" | "MultiFace" |
| 右ボーダー | なし | `border-r border-zinc-800` |
| ナビタブ | 5本（faces含む） | 4本（faces削除） |
| 投稿ボタン | `mt-auto` で最下部 | TopBar へ移動（SideNav からは削除） |
| フェイス一覧 | なし | 区切り線 + FaceNavItem × N + 新規作成ボタン |

---

## TopBar（新規コンポーネント）

**表示条件：** PC のみ（`hidden md:flex`）。SideNav の右側、MainColumn + DetailPanel 両方の上端に固定される共通バー。

### レイアウト

```
<header>  hidden md:flex items-center justify-between
          sticky top-0 z-10 h-12
          border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm
          px-4
  [左側]  ページ名（任意）  text-sm font-semibold text-zinc-400
  [右側]  [投稿ボタン]
            flex items-center gap-2 rounded-full bg-violet-600 px-4 py-1.5
            text-sm font-semibold text-white shadow-md shadow-violet-900/40
            hover:bg-violet-500 active:scale-95 active:bg-violet-700
            + <Pencil size={16} strokeWidth={2.5} />
            + "投稿する"
            クリックで PostModal を開く
```

---

## DetailPanel（新規コンポーネント）

PC の右カラム専用コンポーネント。中央カラムで選択されたアイテムの詳細を表示する。

**表示条件：** PC のみ（`hidden md:block`）

### レイアウト

```
<aside>  hidden md:flex flex-col w-96 shrink-0 sticky top-0 h-screen
         overflow-y-auto
  [プレースホルダー状態]  ← 未選択時
  [詳細コンテンツ]       ← 選択時（ページごとに異なる）
```

### プレースホルダー

```
<div>  flex flex-col items-center justify-center h-full gap-3 px-8 text-center
  <span>  text-4xl text-zinc-700  （ページに応じたアイコン絵文字）
  <p>  text-sm text-zinc-600  "← 左のリストから選択してください"
```

### アクティビティ詳細（ActivityDetail）

ActivityCard でクリックされた際に右パネルに表示する詳細ビュー。

```
<div>  flex flex-col
  [詳細ヘッダー]  sticky top-0 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
    <h2>  text-sm font-semibold text-zinc-400  "アクティビティ詳細"
    閉じるボタン（× アイコン）  h-8 w-8 rounded-full hover:bg-zinc-800

  [コンテンツ]  px-4 py-4 flex flex-col gap-4
    [ユーザー行]  flex items-center gap-3
      Avatar (md)
      [右カラム]  flex flex-col gap-0.5
        ユーザー名 + Badge
        FaceChip + 日時
    [本文]  text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap（全文展開）
    [画像グリッド]  画像がある場合（grid-cols-1 or grid-cols-2）
```

---

## BottomNav（変更なし）

モバイルのみ。現デザインと同一。

---

## FAB（変更なし）

モバイルのみ。現デザインと同一。

---

## ActivityCard（新デザイン）

PC の中央カラムでクリックされると右パネルに詳細が表示されるため、  
カード自体は**プレビュー表示**に留める設計に変更。

### 変更点

| 要素 | 変更前 | 変更後 |
|------|--------|--------|
| 長文 | 200文字で折りたたむ | PCでは折りたたまず、右パネルに全文を委ねる |
| クリック動作 | ページ遷移なし（状態変更のみ） | PC：右パネルに詳細を表示 / モバイル：変更なし（展開のみ） |
| カーソル | デフォルト | PC：`cursor-pointer` |

### PC でのクリック挙動

- カードクリック → URL に `?detail={activityId}` を付与（or Context 更新）
- 選択中カードにハイライト: `ring-1 ring-violet-500/40 bg-zinc-800`
