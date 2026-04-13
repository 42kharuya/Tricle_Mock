/**
 * TopBar（グローバル上部バー）
 * PC 表示時に SideNav の右側、MainColumn・DetailPanel の上部に共通表示される。
 * 詳細な実装は Issue #3 で行う。
 */
const TopBar = () => {
  return (
    <header className="hidden md:flex items-center sticky top-0 z-10 h-12 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm px-4">
      {/* Issue #3 で実装予定 */}
    </header>
  );
};

export default TopBar;
