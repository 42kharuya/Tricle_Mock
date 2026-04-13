# 検索画面（`/search`）

## 概要

キーワード + スコープ（全体 / 自分 / サブスク中）でアクティビティ・フェイスを横断検索する画面。  
ページ全体が1つの Client Component（`"use client"`）。

## ページレイアウト構造

```
<div>  flex flex-col
  [StickyHeader]  ← 検索バー + スコープセレクタを内包
  <main>  px-4 py-4
    SearchResults
```

## StickyHeader（検索専用）

```
<header>  sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <h1>  mb-3 text-lg font-bold text-zinc-100  "検索"
  <div>  flex flex-col gap-2
    SearchBar
    SearchScopeSelector
```

> 他ページより縦に長いヘッダー（検索バー + スコープを含む）

## SearchBar

```
<div>  relative flex items-center
  検索アイコン（Search lucide）  absolute left-3  text-zinc-500  16px
  <input>
    pl-9 pr-4 py-2 w-full
    rounded-full bg-zinc-800 text-sm text-zinc-100
    placeholder:text-zinc-500
    focus:outline-none focus:ring-2 focus:ring-violet-500
```

| プロパティ | 値 |
|-----------|-----|
| 形状 | `rounded-full` |
| 背景 | `bg-zinc-800` |
| テキスト | `text-sm text-zinc-100` |
| placeholder | `text-zinc-500` |
| focus ring | `focus:ring-2 focus:ring-violet-500` |
| 左アイコン | Search 16px `absolute left-3 text-zinc-500` |

## SearchScopeSelector

横並びの3つのスコープ選択ボタン（タブ風）。

```
<div>  flex gap-2
  <button> × 3 （全体 / 自分 / サブスク中）
```

| 状態 | スタイル |
|------|---------|
| 通常 | `rounded-full px-3 py-1 text-xs font-medium text-zinc-400 bg-zinc-800 hover:bg-zinc-700` |
| アクティブ | `bg-violet-600 text-white` |

スコープ種別：

| ラベル | value |
|--------|-------|
| 全体 | `all` |
| 自分 | `mine` |
| サブスク中 | `subscribed` |

## SearchResults

### クエリ未入力状態

```
<div>  flex flex-col items-center gap-3 py-20 text-center
  絵文字  "🔍"  text-3xl
  説明文  text-sm text-zinc-400
  補足  text-xs text-zinc-600
```

### 0件ヒット状態

```
<div>  flex flex-col items-center gap-3 py-20 text-center
  絵文字  "😶"  text-3xl
  "「{query}」に一致する結果が見つかりませんでした"  text-sm text-zinc-400
  補足  text-xs text-zinc-600
```

### 結果あり

```
<div>  flex flex-col gap-6
  [フェイス結果セクション]（フェイスがある場合）
  [アクティビティ結果セクション]（アクティビティがある場合）
```

### フェイス結果

```
<section>  flex flex-col gap-3
  <h2>  text-xs font-semibold uppercase tracking-wider text-zinc-500
    "フェイス"
    <span>  ml-2 text-violet-400  件数
  <ul>  flex flex-col gap-2
    <li>  flex items-center justify-between gap-3
          rounded-2xl bg-zinc-800/60 px-4 py-3
          transition hover:bg-zinc-800
      [左側]  flex min-w-0 items-center gap-3
        絵文字  text-2xl
        [テキスト]  min-w-0
          名前  truncate text-sm font-semibold text-zinc-100
          説明  truncate text-xs text-zinc-400
      [サブスクボタン]  shrink-0 rounded-full text-xs font-medium
        未サブスク: bg-violet-600 px-3 py-1 text-white hover:bg-violet-500
        サブスク中: border border-violet-500 px-3 py-1 text-violet-400
```

### アクティビティ結果

```
<section>  flex flex-col gap-3
  <h2>  text-xs font-semibold uppercase tracking-wider text-zinc-500
    "アクティビティ"
    <span>  ml-2 text-violet-400  件数
  <ul>  flex flex-col gap-3
    <li>
      ui/ActivityCard（通常カードと同じ）
```

## モバイル / PC の差異

| 要素 | モバイル | PC（md:） |
|------|---------|---------|
| ヘッダー | sticky・縦長 | sticky・縦長（同じ） |
| 結果リスト | 1カラム縦積み | 1カラム（カラム幅に収まる） |
| SearchBar | 幅いっぱい | カラム幅いっぱい |

## 問題点・改善余地メモ（現状把握）

- サブスクボタンは `disabled` 属性あり（クリック不可のモックUIのまま）
- フェイス結果にリンクがない（カードをクリックしても `/faces/{id}` へ遷移しない）
- 検索中のスケルトン/ローディング表示がない
- デバウンスなし（1文字ごとに useMemo が再計算）
