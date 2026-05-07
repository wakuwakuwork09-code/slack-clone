import type { Channel } from '@/data/channels'
import { directMessages } from '@/data/dms'
import type { SelectedItem } from '@/App'

interface SidebarContentProps {
  readonly channels: readonly Channel[]
  readonly selectedItem: SelectedItem
  readonly onSelect: (item: SelectedItem) => void
}

export function SidebarContent({ channels, selectedItem, onSelect }: SidebarContentProps) {
  return (
    <>
      <div className="px-4 py-3 font-bold text-lg">
        My Workspace
      </div>

      <div className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-white/70">
        チャンネル
      </div>

      <nav className="flex flex-col px-2 gap-0.5">
        {channels.map((ch) => {
          const isActive = selectedItem.type === 'channel' && selectedItem.id === ch.id
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => onSelect({ type: 'channel', id: ch.id })}
              className={`flex items-center h-8 px-3 rounded text-sm cursor-pointer text-left ${
                isActive ? 'bg-[#1264A3] text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className={`mr-1.5 ${isActive ? 'text-white' : 'text-white/70'}`}>#</span>
              <span>{ch.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="px-3 py-2 text-xs uppercase tracking-wide opacity-70">
        ダイレクトメッセージ
      </div>

      <nav className="flex flex-col px-2 gap-0.5">
        {directMessages.map((dm) => {
          const isActive = selectedItem.type === 'dm' && selectedItem.id === dm.id
          return (
            <button
              key={dm.id}
              type="button"
              onClick={() => onSelect({ type: 'dm', id: dm.id })}
              className={`flex items-center gap-2 h-8 px-3 rounded text-sm cursor-pointer text-left ${
                isActive ? 'bg-[#1264A3] text-white' : 'hover:bg-white/10'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${dm.online ? 'bg-green-500' : 'bg-gray-400'}`}
              />
              <span>{dm.userName}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}

interface SidebarProps {
  readonly channels: readonly Channel[]
  readonly selectedItem: SelectedItem
  readonly onSelect: (item: SelectedItem) => void
}

export function Sidebar({ channels, selectedItem, onSelect }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[260px] flex-shrink-0 bg-[#611f69] text-white flex-col">
      <SidebarContent channels={channels} selectedItem={selectedItem} onSelect={onSelect} />
    </aside>
  )
}
