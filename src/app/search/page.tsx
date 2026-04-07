"use client";

import { useState, useMemo } from "react";
import { activityRepository } from "@/repositories/activity-repository";
import { faceRepository } from "@/repositories/face-repository";
import { userRepository } from "@/repositories/user-repository";
import { subscriptionRepository } from "@/repositories/subscription-repository";
import SearchBar from "@/components/search/SearchBar";
import SearchScopeSelector, {
  type SearchScope,
} from "@/components/search/SearchScopeSelector";
import SearchResults from "@/components/search/SearchResults";

// O(1) 参照用マップ（モジュールレベルで1回だけ構築）
const allFaces = faceRepository.listAll();
const faceMap = new Map(allFaces.map((f) => [f.id, f]));
const userMap = new Map(userRepository.listAll().map((u) => [u.id, u]));

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchScope>("all");

  const currentUser = userRepository.getCurrentUser();
  const subscribedFaceIds = subscriptionRepository.getSubscribedFaceIds();

  const activityResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const lowerQuery = trimmed.toLowerCase();

    // ① スコープでフィルタ
    const allActivities = activityRepository.listAll();
    const scopedActivities = allActivities.filter((a) => {
      if (scope === "mine") return a.userId === currentUser.id;
      if (scope === "subscribed") return subscribedFaceIds.includes(a.faceId);
      return true; // "all"
    });

    // ② クエリで部分一致フィルタ（本文を対象）
    const matched = scopedActivities.filter((a) =>
      a.body.toLowerCase().includes(lowerQuery),
    );

    // ③ user / face を解決して返す（null は除外）
    return matched.flatMap((activity) => {
      const user = userMap.get(activity.userId);
      const face = faceMap.get(activity.faceId);
      if (!user || !face) return [];
      return [{ activity, user, face }];
    });
  }, [query, scope, currentUser.id, subscribedFaceIds]);

  const faceResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const lowerQuery = trimmed.toLowerCase();

    return allFaces.filter(
      (f) =>
        f.name.toLowerCase().includes(lowerQuery) ||
        (f.description ?? "").toLowerCase().includes(lowerQuery),
    );
  }, [query]);

  return (
    <div className="flex flex-col">
      {/* スティッキーヘッダー */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="mb-3 text-lg font-bold text-zinc-100">検索</h1>
        <div className="flex flex-col gap-2">
          <SearchBar value={query} onChange={setQuery} />
          <SearchScopeSelector scope={scope} onScopeChange={setScope} />
        </div>
      </header>

      <main className="px-4 py-4">
        <SearchResults
          query={query.trim()}
          activityResults={activityResults}
          faceResults={faceResults}
          subscribedFaceIds={subscribedFaceIds}
        />
      </main>
    </div>
  );
}
