# グローバルレイアウト（layout.tsx）

## 概要

全ページ共通のシェル。モバイルは BottomNav 固定 + 中央カラム、PC は SideNav + 中央カラムの2カラム構成。

## レイアウト構造

```
<html> dark / antialiased / scroll-smooth
  <body>  bg-zinc-950 · text-zinc-100
    <div>  wrapper（max-w制御）
      <SideNav />          ← PC のみ表示（md:flex）
      <main>               ← 中央カラム（flex-1）
        {children}
      </main>
    </div>
    <BottomNav />          ← モバイルのみ表示（md:hidden）
  </body>
</html>
```

## モバイルレイアウト

| 要素 | スタイル | 補足 |
|------|---------|------|
| wrapper | `mx-auto max-w-sm flex min-h-screen` | 幅 384px 上限、中央揃え |
| main | `flex-1 min-w-0 pb-16` | pb-16 で BottomNav 分のスペース確保 |
| SideNav | `hidden`（非表示） | |
| BottomNav | `fixed bottom-0 z-50` | 常時表示 |
| FAB | `fixed bottom-24 right-4 z-40` | BottomNav と重ならない位置 |

## PC レイアウト（md: 以上）

| 要素 | スタイル | 補足 |
|------|---------|------|
| wrapper | `md:max-w-4xl` | 幅 896px 上限 |
| SideNav | `md:flex w-56 shrink-0 sticky top-0 h-screen` | 左カラム固定幅 224px |
| main | `md:pb-0 md:border-x md:border-zinc-800` | 左右ボーダー付き中央カラム |
| BottomNav | `md:hidden` | 非表示 |
| FAB | `md:hidden` | 非表示（SideNav に投稿ボタンがある） |

## 色トークン（現状）

| 用途 | 値 | Tailwind クラス |
|------|----|-----------------|
| ページ背景 | `#09090b` (zinc-950) | `bg-zinc-950` |
| テキスト | `#f4f4f5` (zinc-100) | `text-zinc-100` |
| サブテキスト | `#71717a` (zinc-500) | `text-zinc-500` |
| ボーダー | `#27272a` (zinc-800) | `border-zinc-800` |
| カード背景 | `#27272a` 60% | `bg-zinc-800/60` |
| アクセント | `#7c3aed` (violet-600) | `bg-violet-600` |
| アクセント薄 | violet-500/20 | `bg-violet-500/20` |
| アクセントテキスト | `#a78bfa` (violet-400) | `text-violet-400` |

## フォント

- 基本フォント：Geist Sans（Google Fonts）
- CSS変数：`--font-geist-sans`
- fallback：Arial, Helvetica, sans-serif

## 共通 Sticky ヘッダーパターン

全ページで同一パターンを使用：

```
<header class="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
  <h1 class="text-lg font-bold text-zinc-100">ページ名</h1>
</header>
```

| プロパティ | 値 | 効果 |
|-----------|-----|------|
| `sticky top-0 z-10` | — | スクロール時も上端に固定 |
| `bg-zinc-950/80 backdrop-blur-sm` | 80%透過 + ブラー | 透過グラス効果 |
| `border-b border-zinc-800` | — | 下ボーダーで区切り |
| `px-4 py-3` | 16px / 12px | 余白 |
