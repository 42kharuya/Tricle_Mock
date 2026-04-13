# 通知画面（`/notifications`）

## 概要

currentUser への通知（サブスク通知 / リンク通知）を時系列降順で表示する画面。

## ページレイアウト構造

```
<div>  flex flex-col
  [StickyHeader]
  <main>  px-4 py-4
    NotificationList
```

## StickyHeader

```
<header>  sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm
  <div>  flex items-center justify-between
    <h1>  text-lg font-bold text-zinc-100  "通知"
    件数テキスト  text-xs text-zinc-500  "N 件"（0件の場合は非表示）
```

## NotificationList

```
<ul>  flex flex-col gap-3
  NotificationItem × N
```

## NotificationItem

```
<li>  flex gap-3 rounded-2xl bg-zinc-800/60 p-4 transition hover:bg-zinc-800
  Avatar (md / 40px)  shrink-0
  [右カラム]  flex flex-1 flex-col gap-1.5 overflow-hidden
    [アクション行]  flex items-start justify-between gap-2
      <p>  text-sm text-zinc-200 leading-snug
        ユーザー名  font-semibold text-zinc-100
        " さんが "
        アクション詳細  text-violet-400
      日時  shrink-0 text-xs text-zinc-500
    [blockquote]  ← リンク通知かつスニペットあり時のみ
      rounded-lg border-l-2 border-violet-500/60 bg-zinc-900/60 px-3 py-2
      text-xs text-zinc-400 line-clamp-2
    通知種別バッジ  self-start rounded-full bg-zinc-700/60 px-2 py-0.5 text-xs text-zinc-400
```

### 通知種別

| type | バッジラベル | アクション詳細テキスト例 |
|------|------------|----------------------|
| `subscribe` | "📥 サブスク" | "〇〇フェイスにサブスクしました" |
| `link` | "🔗 リンク" | "アクティビティにリンクしました" |

### blockquote（リンク通知）

| プロパティ | 値 |
|-----------|-----|
| 左ボーダー | `border-l-2 border-violet-500/60` |
| 背景 | `bg-zinc-900/60` |
| パディング | `px-3 py-2` |
| テキスト | `text-xs text-zinc-400 line-clamp-2` |

## 空状態

現状の実装では空状態の専用 UI がない（リストが空の場合は単に何も表示されない）。

## 相対時刻フォーマット

| 経過時間 | 表示 |
|---------|------|
| 1分未満 | "たった今" |
| 1〜59分 | "N分前" |
| 1〜23時間 | "N時間前" |
| 1〜29日 | "N日前" |
| 30日以上 | yyyy年M月d日（ja-JP） |

## モバイル / PC の差異

| 要素 | モバイル | PC（md:） |
|------|---------|---------|
| カードレイアウト | 縦積み 1カラム | 縦積み 1カラム |
| blockquote | 表示あり | 表示あり |
| FAB | 非表示（通知ページは FAB なし） | 非表示 |

## 問題点・改善余地メモ（現状把握）

- 空状態の UI がない（フォールバック表示なし）
- 通知の既読/未読フラグが未実装（未読バッジなし）
- 通知をタップしても対象アクティビティへのナビゲーションがない
- 全件読了ボタン（マークオールリード）がない
