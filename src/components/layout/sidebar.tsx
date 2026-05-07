const channels = [
  'general',
  'random',
  'project-a',
  'design',
  'announcements',
] as const

export function Sidebar() {
  return (
    <aside className="w-[260px] flex-shrink-0 bg-[#611f69] text-white flex flex-col">
      <div className="px-4 py-3 font-bold text-lg">
        My Workspace
      </div>

      <div className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-white/70">
        チャンネル
      </div>

      <nav className="flex flex-col px-2 gap-0.5">
        {channels.map((name) => (
          <div
            key={name}
            className="flex items-center h-8 px-3 rounded text-sm hover:bg-white/10"
          >
            <span className="mr-1.5 text-white/70">#</span>
            <span>{name}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}
