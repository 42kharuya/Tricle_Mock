"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types/topic";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (topic: Topic) => void;
};

const CreateTopicModal = ({ isOpen, onClose, onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [description, setDescription] = useState("");

  const isValid = title.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    const newTopic: Topic = {
      id: `topic-${crypto.randomUUID()}`,
      userId: "user-1",
      title: title.trim(),
      emoji: emoji.trim() || undefined,
      description: description.trim() || undefined,
    };

    onCreate(newTopic);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setEmoji("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* モーダルパネル */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="新規トピックを作成"
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 shadow-xl"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2 className="text-base font-bold text-zinc-100">新規トピックを作成</h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="閉じる"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
          {/* タイトル（必須） */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="topic-title"
              className="text-xs font-medium text-zinc-400"
            >
              タイトル
              <span className="ml-1 text-violet-400">*</span>
            </label>
            <input
              id="topic-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：読んだ本"
              className={cn(
                "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5",
                "text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors",
                "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50",
              )}
            />
          </div>

          {/* 絵文字（任意） */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="topic-emoji"
              className="text-xs font-medium text-zinc-400"
            >
              絵文字
              <span className="ml-1 text-zinc-600">（任意）</span>
            </label>
            <input
              id="topic-emoji"
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="例：📚"
              className={cn(
                "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5",
                "text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors",
                "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50",
              )}
            />
          </div>

          {/* 説明文（任意） */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="topic-description"
              className="text-xs font-medium text-zinc-400"
            >
              説明文
              <span className="ml-1 text-zinc-600">（任意）</span>
            </label>
            <textarea
              id="topic-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="このトピックについて説明してください"
              rows={3}
              className={cn(
                "w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5",
                "text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors",
                "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50",
              )}
            />
          </div>

          {/* 作成ボタン */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className={cn(
              "w-full rounded-xl py-2.5 text-sm font-semibold transition-colors",
              isValid
                ? "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700"
                : "cursor-not-allowed bg-zinc-700 text-zinc-500",
            )}
          >
            作成する
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTopicModal;
