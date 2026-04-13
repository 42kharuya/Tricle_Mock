# ホーム画面（`/`）

## 概要

currentUser の全アクティビティをフィードで表示するホーム画面。
フェイスフィルタ・タイルカレンダー・プロフィールエリアを含む。

## ページレイアウト構造

```
<div>  flex flex-col
  [StickyHeader]
  <main>
    HomeProfile          ← Server Component（プロフィール + カレンダー）
    HomeClient           ← Client Component（フィルタ + フィード）
  <FAB />                ← モバイルのみ
```

## StickyHeader

```
<header>  sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <h1>  text-lg font-bold text-zinc-100  "ホーム"
```

## HomeProfile（プロフィールエリア）

```
<div>  flex flex-col gap-4 px-4 pt-6 pb-4
  [アイコン行]  flex items-center gap-3
    Avatar (lg / 64px)  ring-2 ring-violet-500/60
    [右カラム]  flex flex-col gap-0.5
      [名前行]  flex items-center gap-2
        ユーザー名  text-lg font-bold text-zinc-100
        Badge（バッジがある場合）
      [統計行]  flex items-center gap-4 text-sm text-zinc-400
        "N フェイス"  数値部分：font-semibold text-zinc-200
        縦セパレーター  w-px h-3.5 bg-zinc-700
        "N アクティビティ"  数値部分：font-semibold text-zinc-200
  ActivityTileCalendar
```

## ActivityTileCalendar（振り返りカレンダー）

```
<section>  px-4
  <h2>  mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500  "振り返り"
  [カレンダー外枠]  overflow-x-auto rounded-xl bg-zinc-800/40 p-3 pb-4
    [月ラベル行]  flex gap-[2px] mb-1 pl-[26px]
      各週  flex-shrink-0 w-[13px]
        月ラベル  text-[9px] leading-none text-zinc-500（月初めの週のみ）
    [曜日 + グリッド行]  flex items-start gap-[6px]
      [曜日ラベル]  flex flex-col flex-shrink-0 gap-[2px]
        各曜日  w-[18px] h-[11px]  月/水/金のみ表示
          text-[9px] leading-none text-zinc-500
      [週グリッド]  flex gap-[2px]
        各週ボタン  flex flex-col gap-[2px]
          各日タイル  w-[13px] h-[11px] rounded-[3px]
  [選択週ドロワー]  ← クリック時に展開
```

### タイルカラー（投稿数に応じた5段階）

| 投稿数 | クラス | 見た目 |
|--------|--------|--------|
| 0 | `bg-zinc-800` | 暗いグレー |
| 1 | `bg-green-200` | 薄い緑 |
| 2〜3 | `bg-green-400` | 緑 |
| 4〜5 | `bg-green-500` | 濃い緑 |
| 6以上 | `bg-green-700` | 最濃緑 |

### タイルインタラクション

- 週ボタンをクリック → 選択週のアクティビティをドロワーに展開
- 同じ週を再クリック → ドロワーを閉じる

### 選択週ドロワー

```
[ドロワー]  mt-3 border-t border-zinc-700/60 pt-3
  [日付範囲ヘッダー]  flex items-center justify-between mb-2
    期間テキスト  text-xs text-zinc-500
    件数テキスト  text-xs text-zinc-500
  [アクティビティリスト]  flex flex-col gap-2
    各行  flex gap-2 items-start
      日付  text-[10px] text-zinc-500 shrink-0 w-10
      FaceChip
      本文スニペット  text-xs text-zinc-300 line-clamp-2
```

## FaceFilterBar（フェイスフィルタ）

```
<div>  overflow-x-auto border-b border-zinc-800 px-4 py-3
  <div>  flex items-center gap-2 w-max（横スクロール）
    [すべてボタン]
    [各フェイスボタン] × N
```

### フェイスボタン

| 要素 | スタイル |
|------|---------|
| アイコン円 | `h-10 w-10 rounded-full flex items-center justify-center text-lg transition-all` |
| 通常背景 | `bg-zinc-800 hover:bg-zinc-700` |
| アクティブ背景 | `bg-violet-600 ring-2 ring-violet-400 ring-offset-2 ring-offset-zinc-950` |
| ラベル | `text-[10px] leading-none max-w-[44px] truncate` |
| ラベル（通常） | `text-zinc-500` |
| ラベル（アクティブ） | `text-violet-400` |
| タップ挙動 | 同じフェイスを再タップ → フィルタ解除 |

## ActivityFeed（アクティビティフィード）

```
<ul>  flex flex-col gap-3
  <li> × N
    ActivityCard（home 用ラッパー → ui/ActivityCard）
```

- selectedFaceId でフィルタ
- 空状態：`text-center text-sm text-zinc-500 py-16` "アクティビティがありません"

## モバイル / PC の差異

| 要素 | モバイル | PC（md:） |
|------|---------|---------|
| ヘッダー | sticky あり | sticky あり |
| カレンダー | 横スクロール | 横スクロール（幅広い分、全体が見える） |
| フィードカード | 1カラム縦積み | 1カラム縦積み（カラム幅に収まる） |
| FAB | 表示（bottom-24 right-4） | 非表示 |
| FaceFilterBar | 横スクロール | 横スクロール |

## 問題点・改善余地メモ（現状把握）

- `globals.css` に CSS 変数のカラートークンなし（Tailwind ハードコードのみ）
- ActivityTileCalendar のタイルサイズが固定 px（`w-[13px] h-[11px]`）で画面幅に非連動
- ProfileArea に bio（自己紹介）フィールドがない
- PC 幅でもシングルカラムフィード（右パネルが未実装）
