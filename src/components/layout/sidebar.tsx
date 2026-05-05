import type { SelectedItem } from '@/App'
import type { Channel } from '@/data/channels'
import { SidebarContent } from '@/components/layout/sidebar-content'

interface SidebarProps {
  readonly channels: readonly Channel[]
  readonly selectedItem: SelectedItem
  readonly onSelectItem: (item: SelectedItem) => void
}

export function Sidebar({ channels, selectedItem, onSelectItem }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[260px] flex-shrink-0 bg-[#611f69] text-white flex-col">
      <SidebarContent channels={channels} selectedItem={selectedItem} onSelectItem={onSelectItem} />
    </aside>
  )
}
