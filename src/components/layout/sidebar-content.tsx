import type { SelectedItem } from '@/App'
import type { Channel } from '@/data/channels'
import { Button } from '@/components/ui/button'
import { directMessages } from '@/data/dms'

interface SidebarContentProps {
  readonly channels: readonly Channel[]
  readonly joinedChannelIds: ReadonlySet<string>
  readonly selectedItem: SelectedItem
  readonly onSelectItem: (item: SelectedItem) => void
  readonly onJoinChannel: (channelId: string) => void
  readonly onLeaveChannel: (channelId: string) => void
}

export function SidebarContent({ channels, joinedChannelIds, selectedItem, onSelectItem, onJoinChannel, onLeaveChannel }: SidebarContentProps) {
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
          const isJoined = joinedChannelIds.has(channel.id)
          return (
            <div
              key={channel.id}
              className={`flex items-center h-8 px-3 rounded text-sm cursor-pointer ${
                isActive ? 'bg-[#1264A3] text-white' : 'hover:bg-white/10'
              }`}
            >
              <div
                className="flex-1 flex items-center min-w-0"
                onClick={() => onSelectItem({ type: 'channel', id: channel.id })}
              >
                <span className={`mr-1.5 ${isActive ? 'text-white' : 'text-white/70'}`}>#</span>
                <span className="truncate">{channel.name}</span>
              </div>
              {isJoined ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] ml-1 flex-shrink-0"
                  onClick={(e) => { e.stopPropagation(); onLeaveChannel(channel.id) }}
                >
                  退出
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] ml-1 flex-shrink-0"
                  onClick={(e) => { e.stopPropagation(); onJoinChannel(channel.id) }}
                >
                  参加
                </Button>
              )}
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
