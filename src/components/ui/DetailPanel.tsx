/**
 * DetailPanel（右カラム詳細パネル）
 * PC 表示時に MainColumn の右側に固定表示される。
 * 中央カラムで選択したアイテムの詳細を表示する。
 * 詳細な実装は Issue #4 で行う。
 */
const DetailPanel = () => {
  return (
    <aside className="hidden md:flex w-96 shrink-0 overflow-y-auto flex-col">
      {/* 未選択時プレースホルダー（Issue #4 で詳細実装予定） */}
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
        <span className="text-4xl text-zinc-700">👈</span>
        <p className="text-sm text-zinc-600">← 左のリストから選択してください</p>
      </div>
    </aside>
  );
};

export default DetailPanel;
