import { type Activity } from "@/types/activity";
import { type User } from "@/types/user";
import { type Face } from "@/types/face";
import ActivityCard from "@/components/ui/ActivityCard";

type ActivityResultItem = {
  activity: Activity;
  user: User;
  face: Face;
};

type SearchResultsProps = {
  query: string;
  activityResults: ActivityResultItem[];
  faceResults: Face[];
  subscribedFaceIds: string[];
};

/**
 * 検索結果一覧。
 * - クエリ未入力: 検索促進メッセージを表示
 * - クエリあり・0件: 該当なしメッセージを表示
 * - クエリあり・N件: フェイス一覧 + アクティビティ一覧を表示
 */
const SearchResults = ({
  query,
  activityResults,
  faceResults,
  subscribedFaceIds,
}: SearchResultsProps) => {
  if (!query) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-3xl">🔍</p>
        <p className="text-sm text-zinc-400">
          キーワードを入力して検索してください
        </p>
        <p className="text-xs text-zinc-600">
          フェイス名・アクティビティ本文をスコープに応じて絞り込みます
        </p>
      </div>
    );
  }

  const totalCount = faceResults.length + activityResults.length;

  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-3xl">😶</p>
        <p className="text-sm text-zinc-400">
          「{query}」に一致する結果が見つかりませんでした
        </p>
        <p className="text-xs text-zinc-600">
          別のキーワードやスコープで試してみてください
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* フェイス検索結果セクション */}
      {faceResults.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            フェイス
            <span className="ml-2 text-violet-400">{faceResults.length}</span>
          </h2>
          <ul className="flex flex-col gap-2">
            {faceResults.map((face) => {
              const isSubscribed = subscribedFaceIds.includes(face.id);
              return (
                <li
                  key={face.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-800/60 px-4 py-3 transition hover:bg-zinc-800"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {face.emoji && (
                      <span className="text-2xl">{face.emoji}</span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-100">
                        {face.name}
                      </p>
                      {face.description && (
                        <p className="truncate text-xs text-zinc-400">
                          {face.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className={
                      isSubscribed
                        ? "shrink-0 rounded-full border border-violet-500 px-3 py-1 text-xs font-medium text-violet-400"
                        : "shrink-0 rounded-full bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-500"
                    }
                    disabled
                    aria-label={
                      isSubscribed
                        ? `${face.name}のサブスクを解除`
                        : `${face.name}をサブスクする`
                    }
                  >
                    {isSubscribed ? "サブスク中" : "サブスクする"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* アクティビティ検索結果セクション */}
      {activityResults.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            アクティビティ
            <span className="ml-2 text-violet-400">{activityResults.length}</span>
          </h2>
          <ul className="flex flex-col gap-3">
            {activityResults.map(({ activity, user, face }) => (
              <li key={activity.id}>
                <ActivityCard
                  activity={activity}
                  user={user}
                  topicTitle={`${face.emoji ?? ""} ${face.name}`.trim()}
                  topicId={face.id}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default SearchResults;
