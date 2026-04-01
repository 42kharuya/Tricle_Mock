import { type Topic } from "@/types/topic";

// user-1（山田 太郎）のトピック
const user1Topics: Topic[] = [
  {
    id: "topic-1-1",
    userId: "user-1",
    title: "読書",
    imageUrl: "https://picsum.photos/seed/books/400/200",
  },
  {
    id: "topic-1-2",
    userId: "user-1",
    title: "映画",
    imageUrl: "https://picsum.photos/seed/movie/400/200",
  },
  {
    id: "topic-1-3",
    userId: "user-1",
    title: "料理日記",
    imageUrl: "https://picsum.photos/seed/cooking/400/200",
  },
  {
    id: "topic-1-4",
    userId: "user-1",
    title: "今日の出来事",
  },
];

// user-2（佐藤 花子）のトピック
const user2Topics: Topic[] = [
  {
    id: "topic-2-1",
    userId: "user-2",
    title: "読んだ本",
    imageUrl: "https://picsum.photos/seed/hanako-books/400/200",
  },
  {
    id: "topic-2-2",
    userId: "user-2",
    title: "カフェ巡り",
    imageUrl: "https://picsum.photos/seed/cafe/400/200",
  },
  {
    id: "topic-2-3",
    userId: "user-2",
    title: "旅行記",
    imageUrl: "https://picsum.photos/seed/travel/400/200",
  },
];

// user-3（鈴木 一郎）のトピック
const user3Topics: Topic[] = [
  {
    id: "topic-3-1",
    userId: "user-3",
    title: "ゲーム記録",
    imageUrl: "https://picsum.photos/seed/game/400/200",
  },
  {
    id: "topic-3-2",
    userId: "user-3",
    title: "アニメ感想",
    imageUrl: "https://picsum.photos/seed/anime/400/200",
  },
  {
    id: "topic-3-3",
    userId: "user-3",
    title: "筋トレログ",
    imageUrl: "https://picsum.photos/seed/gym/400/200",
  },
  {
    id: "topic-3-4",
    userId: "user-3",
    title: "技術メモ",
  },
];

// user-4（田中 美咲）のトピック
const user4Topics: Topic[] = [
  {
    id: "topic-4-1",
    userId: "user-4",
    title: "料理レシピ",
    imageUrl: "https://picsum.photos/seed/recipe/400/200",
  },
  {
    id: "topic-4-2",
    userId: "user-4",
    title: "映画・ドラマ",
    imageUrl: "https://picsum.photos/seed/drama/400/200",
  },
  {
    id: "topic-4-3",
    userId: "user-4",
    title: "植物育成",
    imageUrl: "https://picsum.photos/seed/plants/400/200",
  },
];

export const topics: Topic[] = [
  ...user1Topics,
  ...user2Topics,
  ...user3Topics,
  ...user4Topics,
];
