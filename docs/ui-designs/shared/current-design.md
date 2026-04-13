# 共通 UI コンポーネント（src/components/ui/）

## SideNav

**表示条件：** PC のみ（`hidden md:flex`）

### レイアウト構造

```
<nav>  hidden md:flex flex-col gap-2 w-56 shrink-0 sticky top-0 h-screen pt-6 pb-6 px-3
  ロゴエリア                px-3 pb-4
  <ul> ナビリスト           flex flex-col gap-1
    <li> × 5 ナビアイテム
  投稿ボタン               mt-auto → 最下部
```

### ロゴ

| 要素 | スタイル |
|------|---------|
| テキスト | `text-xl font-bold text-violet-400 tracking-tight` |
| 内容 | "Tricle_Mock"（※MultiFaceへの更新余地あり） |

### ナビアイテム

| 状態 | スタイル |
|------|---------|
| 通常 | `rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100` |
| アクティブ | `bg-violet-500/20 text-violet-400` |
| アイコン（通常） | `strokeWidth={2}` |
| アイコン（アクティブ） | `strokeWidth={2.5}` + `[&>*]:fill-current`（塗りつぶし） |
| アイコンサイズ | 20px |
| テキスト | `text-sm` |

### ナビアイテム一覧

| ラベル | パス | アイコン |
|--------|------|--------|
| フェイス | `/faces` | Layers |
| ホーム | `/` | Home |
| サブスク | `/subscriptions` | Rss |
| 通知 | `/notifications` | Bell |
| 検索 | `/search` | Search |

### 投稿ボタン（Pencil）

| 要素 | スタイル |
|------|---------|
| 位置 | ナビリスト下部 `mt-auto` |
| スタイル | `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100` |
| アイコン | Pencil 20px |
| クリック | PostModal を開く |

## BottomNav

**表示条件：** モバイルのみ（`md:hidden`）

### レイアウト

```
<nav>  md:hidden fixed bottom-0 left-0 right-0 z-50
       border-t border-zinc-700/60 bg-zinc-900/95 backdrop-blur-sm
       flex justify-center
  <ul>  flex w-full max-w-sm items-center
    <li class="flex-1"> × 5
```

### ナビアイテム

| 状態 | スタイル |
|------|---------|
| 通常 | `text-zinc-500 hover:text-zinc-300` |
| アクティブ | `text-violet-400` |
| ピル（通常） | `rounded-xl px-3 py-1.5 text-xs font-medium bg-transparent` |
| ピル（アクティブ） | `bg-violet-500/20` |
| アイコンサイズ | 22px |
| テキスト | `text-xs whitespace-nowrap` |
| 縦配置 | アイコン + ラベルを縦に並べる（`flex flex-col items-center gap-0.5`） |

## FAB（Floating Action Button）

**表示条件：** モバイルのみ（`md:hidden`）

| プロパティ | 値 |
|-----------|-----|
| 位置 | `fixed bottom-24 right-4 z-40` |
| サイズ | `h-14 w-14` (56px 円) |
| 背景 | `bg-violet-600` |
| アイコン | Pencil 22px strokeWidth=2.5 |
| 影 | `shadow-lg shadow-violet-900/50` |
| hover | `hover:bg-violet-500` |
| active | `active:scale-95 active:bg-violet-700` |
| クリック | PostModal を開く |

## Avatar

| size | px | クラス |
|------|----|--------|
| sm | 24px | `w-6 h-6` |
| md | 40px | `w-10 h-10` |
| lg | 64px | `w-16 h-16` |

共通スタイル：`rounded-full object-cover ring-1 ring-zinc-700`

ホームプロフィールでは追加で `ring-2 ring-violet-500/60` を付与。

## Badge

- emoji を表示するだけのシンプルな `<span>`
- 独自スタイルなし（呼び出し側で `className` を渡す）
- aria-label="バッジ"

## FaceChip

フェイスIDのハッシュ値でカラーパレット（8色）から色を決定。

| プロパティ | 値 |
|-----------|-----|
| 形状 | `inline-flex items-center rounded-full px-2.5 py-0.5` |
| テキスト | `text-xs font-medium` |

カラーパレット（背景/文字）：
1. `bg-violet-900/60 text-violet-300`
2. `bg-sky-900/60 text-sky-300`
3. `bg-emerald-900/60 text-emerald-300`
4. `bg-amber-900/60 text-amber-300`
5. `bg-rose-900/60 text-rose-300`
6. `bg-pink-900/60 text-pink-300`
7. `bg-teal-900/60 text-teal-300`
8. `bg-orange-900/60 text-orange-300`

## ActivityCard（ui/ActivityCard.tsx）

全フィードで共有されるカードコンポーネント。

### 外形

| プロパティ | 値 |
|-----------|-----|
| 形状 | `rounded-2xl` |
| 背景 | `bg-zinc-800/60` |
| パディング | `p-4` |
| gap | `gap-3`（縦方向） |
| hover | `hover:bg-zinc-800 hover:scale-[1.01]` |
| active | `active:scale-[0.99]` |
| transition | `transition` |

### 内部レイアウト（縦積み）

```
[ヘッダー行]  flex items-start gap-3
  Avatar (md / 40px)
  [右カラム]  flex flex-col gap-0.5
    [名前行]  flex items-center gap-1.5
      ユーザー名  text-sm font-semibold text-zinc-100 truncate
      Badge（バッジがある場合）
    [メタ行]  flex items-center gap-2
      FaceChip（リンク付き）
      投稿日時  text-xs text-zinc-500

[本文]  text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap

[もっと見る ボタン]  ← 200文字超の場合のみ表示
  text-xs font-medium text-violet-400 hover:text-violet-300

[画像グリッド]  ← 画像がある場合
  1枚：grid-cols-1
  複数：grid-cols-2
  rounded-xl overflow-hidden
```

### 長文折りたたみ

- 閾値：200文字
- 折りたたみ時は末尾に「…」付加
- ボタン: 「もっと見る」／「折りたたむ」

## PostModal

### 外形・配置

| プロパティ | 値 |
|-----------|-----|
| 配置 | `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` |
| 幅 | `w-[calc(100%-2rem)] max-w-sm` |
| 背景 | `bg-zinc-900` |
| 角丸 | `rounded-2xl` |
| 影 | `shadow-xl` |
| オーバーレイ | `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm` |

### 内部構成

```
[ヘッダー]  flex items-center justify-between px-4 pt-4 pb-2
  タイトル "投稿する"  text-base font-bold text-zinc-100
  閉じるボタン  h-8 w-8 rounded-full hover:bg-zinc-800

[フェイス選択]
  ラベル + <select>  bg-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-sm

[テキストエリア]
  rows=5 / max 5000文字
  bg-transparent text-sm text-zinc-200 resize-none px-4 py-3
  文字数カウンター（右下）text-xs text-zinc-600

[画像プレビュー行]  flex flex-wrap gap-2 px-4
  各画像  80px 正方形 rounded-lg object-cover
  削除ボタン  × を画像右上に重ねる

[フッター]  flex items-center justify-between px-4 pt-3 pb-4
  画像追加ボタン（最大4枚）  ImagePlus アイコン
  投稿ボタン  rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold
```
