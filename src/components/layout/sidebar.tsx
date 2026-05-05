import type { SelectedItem } from '@/App'
import { SidebarContent } from '@/components/layout/sidebar-content'

interface SidebarProps {
  readonly selectedItem: SelectedItem
  readonly onSelectItem: (item: SelectedItem) => void
}

export function Sidebar({ selectedItem, onSelectItem }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[260px] flex-shrink-0 bg-[#611f69] text-white flex-col">
      <SidebarContent selectedItem={selectedItem} onSelectItem={onSelectItem} />
    </aside>
  )
}
