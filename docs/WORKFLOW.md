# Tricle → MultiFace 移行ワークフロー

このドキュメントは、現在の Tricle モック実装を MultiFace モック実装へ移行するための作業手順書です。 
各 Step を順番に進めることで、動作を壊さずに段階的に移行できます。

## 現状の把握

### 現在の実装で残っている Tricle 命名・設計

| 分類 | 現状 | 移行後 |
|---|---|---|
| 型定義 | `src/types/topic.ts`（`Topic` 型） | `src/types/face.ts`（`Face` 型） |
| アクティビティ型のフィールド | `topicId: string` | `faceId: string` |
| モックデータ | `src/mocks/topics.ts` | `src/mocks/faces.ts` |
| モックデータ | `subscribedTopicIds` | `subscribedFaceIds` |
| ページ | `src/app/topics/` | `src/app/faces/` |
| ページ | `src/app/profile/`（独立ページ） | ホームに統合（廃止） |
| コンポーネント | `src/components/topic/` | `src/components/face/` |
| ナビゲーション | 5タブ（ホーム・サブスク・トピック・検索・プロフィール） | 5タブ（フェイス一覧・ホーム・サブスク・通知・検索） |
| Repository 層 | **存在しない**（全コンポーネントが `mocks/` を直接 import） | `src/repositories/` を新設 |
| アプリメタデータ | タイトル「Tricle_Mock」 | タイトル「MultiFace」 |

### mocks を直接 import しているファイル一覧（Repository 化が必要）

| ファイル | import しているモック |
|---|---|
| `src/app/topics/page.tsx` | `topics`, `currentUser` |
| `src/app/profile/page.tsx` | `currentUser`, `topics`, `activities` |
| `src/app/subscriptions/page.tsx` | `subscribedTopicIds` |
| `src/app/search/page.tsx` | `activities`, `topics`, `users`, `currentUser`, `subscribedTopicIds` |
| `src/components/home/ActivityFeed.tsx` | `activities`, `topics`, `currentUser` |
| `src/components/home/TimelineFeed.tsx` | `activities`, `topics`, `users` |
| `src/components/subscriptions/SubscriptionFeed.tsx` | `activities`, `topics`, `users`, `subscribedTopicIds` |

## Step 1: 型定義の移行

**目的**: MultiFace の命名（`Face` / `faceId`）に統一する基盤を作る。

### 作業内容

1. **`src/types/face.ts` を新規作成**

   ```typescript
   export type Face = {
     id: string;
     userId: string;
     name: string;          // title → name にリネーム
     emoji?: string;
     description?: string;
     imageUrl?: string;
     isPrivate: boolean;    // MultiFace 新規フィールド（公開/非公開）
   };
   ```

2. **`src/types/activity.ts` を更新**

   `topicId` → `faceId` にリネーム。

3. 旧 `src/types/topic.ts` はこの時点ではまだ残す（後続 Step で削除）

### 完了条件

- [ ] `src/types/face.ts` が存在する
- [ ] `src/types/activity.ts` のフィールドが `faceId` になっている

## Step 2: モックデータの移行

**目的**: データ定義を MultiFace の構造に合わせる。

### 作業内容

1. **`src/mocks/faces.ts` を新規作成**

   `src/mocks/topics.ts` をベースに以下を変更：
   - 変数名: `topic` 系 → `face` 系
   - 型: `Topic` → `Face`（`isPrivate: false` を全エントリに追加）
   - フィールド: `title` → `name`

2. **`src/mocks/activities.ts` を更新**

   全エントリの `topicId` フィールドを `faceId` にリネーム。

3. **`src/mocks/subscriptions.ts` を更新**

   `subscribedTopicIds` → `subscribedFaceIds` にリネーム。

4. 旧 `src/mocks/topics.ts` はこの時点ではまだ残す（後続 Step で削除）

### 完了条件

- [ ] `src/mocks/faces.ts` が存在する
- [ ] `src/mocks/activities.ts` の全エントリに `faceId` がある
- [ ] `src/mocks/subscriptions.ts` が `subscribedFaceIds` をエクスポートしている

## Step 3: Repository 層の新規作成

**目的**: コンポーネントとモックデータの間に Repository を挟み、将来の API 差し替えを可能にする。

### 作業内容

`src/repositories/` ディレクトリを作成し、以下の4ファイルを作成する。  
各ファイルの構造は「型（インターフェース）の定義」→「モック実装のエクスポート」の順で書く。

1. **`src/repositories/face-repository.ts`**

   | メソッド | 説明 |
   |---|---|
   | `listByUserId(userId)` | 指定ユーザーのフェイス一覧 |
   | `findById(faceId)` | ID でフェイスを1件取得 |
   | `create(input)` | フェイスを作成（モックはダミー返却） |

2. **`src/repositories/activity-repository.ts`**

   | メソッド | 説明 |
   |---|---|
   | `listByUserId(userId)` | 指定ユーザーのアクティビティ一覧 |
   | `listByFaceId(faceId)` | 指定フェイスのアクティビティ一覧 |
   | `listAll()` | 全アクティビティ一覧（タイムライン用） |
   | `listByFaceIds(faceIds)` | 指定フェイスIDリストのアクティビティ一覧（サブスク用） |

3. **`src/repositories/user-repository.ts`**

   | メソッド | 説明 |
   |---|---|
   | `getCurrentUser()` | ログイン中ユーザーを取得 |
   | `findById(userId)` | ID でユーザーを1件取得 |
   | `listAll()` | 全ユーザー一覧 |

4. **`src/repositories/subscription-repository.ts`**

   | メソッド | 説明 |
   |---|---|
   | `getSubscribedFaceIds()` | サブスク中のフェイスID一覧を取得 |

### 完了条件

- [ ] `src/repositories/` に4ファイルが存在する
- [ ] 各 Repository は `mocks/` を内部で参照しており、コンポーネントへは Repository だけを公開している
- [ ] TypeScript エラーなし

## Step 4: ナビゲーションの更新

**目的**: MultiFace の5タブ構成に切り替える。

### 現状 → 移行後のタブ対応

| 現状 | 移行後 | URL | 変更種別 |
|---|---|---|---|
| ホーム | ホーム | `/` | 変更なし |
| サブスク | サブスク | `/subscriptions` | 変更なし |
| トピック | フェイス一覧 | `/faces` | URL・ラベル変更 |
| 検索 | 検索 | `/search` | 変更なし |
| プロフィール | 通知 | `/notifications` | URL・ラベル・アイコン変更 |

### 作業内容

1. **`src/components/ui/BottomNav.tsx` を更新**

   ```tsx
   const NAV_ITEMS = [
     { href: "/faces",         label: "フェイス", icon: Layers },
     { href: "/",              label: "ホーム",   icon: Home },
     { href: "/subscriptions", label: "サブスク", icon: Rss },
     { href: "/notifications", label: "通知",     icon: Bell },
     { href: "/search",        label: "検索",     icon: Search },
   ];
   ```

2. **`src/components/ui/SideNav.tsx` も同様に更新**（PC 向けサイドナビ）

### 完了条件

- [ ] BottomNav・SideNav に「フェイス一覧・ホーム・サブスク・通知・検索」の5タブが表示されている
- [ ] `/topics` と `/profile` へのリンクが消えている

## Step 5: フェイス一覧タブ（/faces）の実装

**目的**: Tricle の「トピック」タブを MultiFace の「フェイス一覧」タブに移行する。

### 作業内容

1. **`src/app/faces/page.tsx` を新規作成**

   `src/app/topics/page.tsx` をベースに以下を変更：
   - `topics` / `topicRepository` → `faceRepository` 経由に変更
   - `Topic` 型 → `Face` 型

2. **`src/components/face/` ディレクトリを作成**

   以下を `src/components/topic/` からコピー＆リネーム：

   | 旧ファイル | 新ファイル | 変更内容 |
   |---|---|---|
   | `TopicsClient.tsx` | `FacesClient.tsx` | `Topic` → `Face`, `/topics/` → `/faces/` |
   | `CreateTopicModal.tsx` | `CreateFaceModal.tsx` | フォームに「公開/非公開」トグルを追加 |
   | `TopicActivityFeed.tsx` | `FaceActivityFeed.tsx` | `topicId` → `faceId`, Repository 経由に変更 |
   | `TopicHeader.tsx` | `FaceHeader.tsx` | `Topic` 型 → `Face` 型 |

3. **`src/app/faces/[faceId]/page.tsx` を新規作成**

   `src/app/topics/[topicId]/page.tsx` のリネーム・移行版。

### 完了条件

- [ ] `/faces` でフェイス一覧が表示される
- [ ] `/faces/[faceId]` でフェイス詳細が表示される
- [ ] フェイス新規作成モーダルに「公開/非公開」の設定がある
- [ ] `src/components/face/` の各コンポーネントが Repository 経由でデータを取得している

## Step 6: ホームタブの再設計

**目的**: MultiFace の仕様に合わせてホームを再設計する（プロフィール統合・フェイスフィルタ）。

### 変更内容（`MULTI_FACE.md` 仕様より）

```
ホームタブ（移行後）
├── 上部: プロフィールエリア
│   ├── ユーザーアイコン・名前・バッジ
│   ├── フェイス数・アクティビティ数
│   └── タイル表示（GitHubコントリビューション風）
├── 中部: フェイスアイコン一覧（タップでフィルタ）
└── 下部: アクティビティフィード（フィルタ対応）
```

### 作業内容

1. **`src/components/home/HomeProfile.tsx` を新規作成**

   現在 `src/app/profile/` にある `UserInfo` と `ActivityTileCalendar` をホームに移植・統合する。

2. **`src/components/home/FaceFilterBar.tsx` を新規作成**

   自分のフェイスアイコンを横スクロールで一覧表示し、タップで絞り込む Client Component。

3. **`src/components/home/ActivityFeed.tsx` を更新**

   - `topicId` → `faceId` に対応
   - `topics` → `faceRepository` 経由に変更
   - フィルタ（`selectedFaceId`）の props を受け取れるようにする

4. **`src/app/page.tsx` を更新**

   `HomeTabs`（自分の投稿 / タイムライン）構造から、`HomeProfile` + `FaceFilterBar` + `ActivityFeed` 構造に変更する。  
   ※「タイムライン」タブは MultiFace の仕様外のため削除。

### 完了条件

- [ ] ホーム上部にプロフィール情報（アイコン・フェイス数・アクティビティ数・タイル）が表示される
- [ ] フェイスアイコンをタップするとそのフェイスのアクティビティに絞り込める
- [ ] データ取得は全て Repository 経由になっている

## Step 7: サブスクタブの更新

**目的**: `topicId` ベースのサブスク実装を `faceId` ベースに更新し、オンボーディング UI を追加する。

### 作業内容

1. **`src/components/subscriptions/SubscriptionFeed.tsx` を更新**

   - `subscribedTopicIds` → `subscriptionRepository.getSubscribedFaceIds()` 経由に変更
   - `topics` / `topicMap` → `faces` / `faceMap` に変更
   - `topicId` → `faceId` に変更

2. **`src/app/subscriptions/page.tsx` を更新**

   - ヘッダーの「〇 トピックをサブスク中」→「〇 フェイスをサブスク中」

3. **オンボーディング UI の追加**（仕様: サブスク0件の場合）

   `SubscriptionFeed` 内でサブスク0件時に以下を表示：
   - 「まだサブスクしているフェイスがありません」メッセージ
   - 「検索してフェイスを探す」ボタン（`/search` へのリンク）

### 完了条件

- [ ] サブスクフィードが `faceId` ベースで動作している
- [ ] サブスク0件時にオンボーディング UI が表示される

## Step 8: 通知タブの新規実装

**目的**: MultiFace 固有の通知タブ（`/notifications`）を新規に実装する。

### 通知の種類（`MULTI_FACE.md` 仕様より）

| 種類 | トリガー |
|---|---|
| リンク通知 | 誰かが自分のアクティビティをリンクした |
| サブスク通知 | 誰かが自分のフェイスをサブスクライブした |

### 作業内容

1. **`src/types/notification.ts` を新規作成**

   ```typescript
   export type Notification =
     | { id: string; type: "link"; fromUserId: string; activityId: string; createdAt: string }
     | { id: string; type: "subscribe"; fromUserId: string; faceId: string; createdAt: string };
   ```

2. **`src/mocks/notifications.ts` を新規作成**

   リンク通知・サブスク通知のダミーデータを作成。

3. **`src/repositories/notification-repository.ts` を新規作成**

   `listAll()` メソッドを持つ Repository。

4. **`src/components/notifications/NotificationList.tsx` を新規作成**

   通知を時系列降順で表示するコンポーネント。

5. **`src/app/notifications/page.tsx` を新規作成**

### 完了条件

- [ ] `/notifications` でリンク通知・サブスク通知が表示される

## Step 9: 検索タブの更新

**目的**: 用語を MultiFace に合わせ、フェイス検索にも対応する。

### 作業内容

1. **`src/app/search/page.tsx` を更新**

   - `topics` / `topicMap` → `faces` / `faceMap` に変更
   - `subscribedTopicIds` → `subscriptionRepository.getSubscribedFaceIds()` 経由に変更
   - `mocks/` の直接 import をすべて Repository 経由に変更

2. **`src/components/search/SearchScopeSelector.tsx` を更新**

   スコープのラベルを更新：「サブスクしているトピック」→「サブスクしているフェイス」

3. **フェイス検索の追加**（アクティビティだけでなくフェイスも検索対象にする）

   - 検索結果にフェイス一覧セクションを追加
   - フェイスカードからサブスクライブできる導線を設ける

### 完了条件

- [ ] 検索が `faceId` ベースで動作している
- [ ] スコープ選択の文言が MultiFace 仕様になっている
- [ ] フェイス自体も検索対象になっている

## Step 10: メタデータ・layout.tsx の更新

**目的**: アプリの表示名・説明を MultiFace に変更する。

### 作業内容

1. **`src/app/layout.tsx` を更新**

   ```typescript
   export const metadata: Metadata = {
     title: "MultiFace",
     description: "フェイス（多面性）で記録する SNS",
   };
   ```

## Step 11: 旧 Tricle ファイルの削除

**目的**: 移行完了後に不要になった旧ファイルを削除してコードベースをクリーンにする。

> ⚠️ 前 Step がすべて完了し、TypeScript エラーがないことを確認してから実施する。

### 削除対象

| ファイル / ディレクトリ | 理由 |
|---|---|
| `src/types/topic.ts` | `src/types/face.ts` に移行済み |
| `src/mocks/topics.ts` | `src/mocks/faces.ts` に移行済み |
| `src/components/topic/` | `src/components/face/` に移行済み |
| `src/app/topics/` | `src/app/faces/` に移行済み |
| `src/app/profile/` | ホームタブに統合済み |
| `src/components/profile/` | ホームコンポーネントに統合済み |
| `src/components/home/HomeTabs.tsx` | ホーム再設計で不要になった場合 |
| `src/components/home/TimelineFeed.tsx` | MultiFace 仕様外のため |

### 完了条件

- [ ] `topic` という命名がコードベースから消えている
- [ ] `npm run build` が成功する
- [ ] TypeScript エラーなし・ESLint エラーなし

## 移行完了チェックリスト

全 Step が終わったら以下を確認する。

```
[ ] Step 1: 型定義の移行
[ ] Step 2: モックデータの移行
[ ] Step 3: Repository 層の新規作成
[ ] Step 4: ナビゲーションの更新
[ ] Step 5: フェイス一覧タブ（/faces）の実装
[ ] Step 6: ホームタブの再設計
[ ] Step 7: サブスクタブの更新
[ ] Step 8: 通知タブの新規実装
[ ] Step 9: 検索タブの更新
[ ] Step 10: メタデータ・layout.tsx の更新
[ ] Step 11: 旧 Tricle ファイルの削除
```

### 最終確認

- [ ] `npm run build` が成功する
- [ ] 全タブ（フェイス一覧・ホーム・サブスク・通知・検索）が動作する
- [ ] コードベースに `topic` / `topicId` の命名が残っていない
- [ ] `src/mocks/` をコンポーネントや `page.tsx` が直接 import している箇所がない
