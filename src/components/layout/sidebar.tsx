import type { SelectedItem } from '@/App'
import type { Channel } from '@/data/channels'
import { SidebarContent } from '@/components/layout/sidebar-content'

interface SidebarProps {
  readonly channels: readonly Channel[]
  readonly joinedChannelIds: ReadonlySet<string>
  readonly selectedItem: SelectedItem
  readonly onSelectItem: (item: SelectedItem) => void
  readonly onJoinChannel: (channelId: string) => void
  readonly onLeaveChannel: (channelId: string) => void
}

export function Sidebar({ channels, joinedChannelIds, selectedItem, onSelectItem, onJoinChannel, onLeaveChannel }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[260px] flex-shrink-0 bg-[#611f69] text-white flex-col">
      <SidebarContent channels={channels} joinedChannelIds={joinedChannelIds} selectedItem={selectedItem} onSelectItem={onSelectItem} onJoinChannel={onJoinChannel} onLeaveChannel={onLeaveChannel} />
    </aside>
  )
}
