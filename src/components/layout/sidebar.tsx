import { SidebarContent } from '@/components/layout/sidebar-content'

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-[260px] flex-shrink-0 bg-[#611f69] text-white flex-col">
      <SidebarContent />
    </aside>
  )
}
