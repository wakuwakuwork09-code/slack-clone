import type { SelectedItem } from '@/App'
import type { Channel } from '@/data/channels'
import { directMessages } from '@/data/dms'

interface SidebarContentProps {
  readonly channels: readonly Channel[]
  readonly selectedItem: SelectedItem
  readonly onSelectItem: (item: SelectedItem) => void
}

export function SidebarContent({ channels, selectedItem, onSelectItem }: SidebarContentProps) {
  return (
    <>
      <div className="px-4 py-3 font-bold text-lg">
        My Workspace
      </div>

      <div className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-white/70">
        チャンネル
      </div>

      <nav className="flex flex-col px-2 gap-0.5">
        {channels.map((channel) => {
          const isActive = selectedItem.type === 'channel' && selectedItem.id === channel.id
          return (
            <div
              key={channel.id}
              onClick={() => onSelectItem({ type: 'channel', id: channel.id })}
              className={`flex items-center h-8 px-3 rounded text-sm cursor-pointer ${
                isActive ? 'bg-[#1264A3] text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className={`mr-1.5 ${isActive ? 'text-white' : 'text-white/70'}`}>#</span>
              {channel.name}
            </div>
          )
        })}
      </nav>

      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/70">
        ダイレクトメッセージ
      </div>

      <nav className="flex flex-col px-2 gap-0.5">
        {directMessages.map((dm) => {
          const isActive = selectedItem.type === 'dm' && selectedItem.id === dm.id
          return (
            <div
              key={dm.id}
              onClick={() => onSelectItem({ type: 'dm', id: dm.id })}
              className={`flex items-center gap-2 h-8 px-3 rounded text-sm cursor-pointer ${
                isActive ? 'bg-[#1264A3] text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dm.online ? 'bg-green-500' : 'bg-gray-400'}`} />
              {dm.name}
            </div>
          )
        })}
      </nav>
    </>
  )
}
