import { useState } from 'react'
import { Menu } from 'lucide-react'
import type { SelectedItem } from '@/App'
import type { Channel } from '@/data/channels'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { SidebarContent } from '@/components/layout/sidebar-content'
import { directMessages } from '@/data/dms'

interface ChatHeaderProps {
  readonly channels: readonly Channel[]
  readonly selectedItem: SelectedItem
  readonly onSelectItem: (item: SelectedItem) => void
}

function getHeaderTitle(channels: readonly Channel[], selectedItem: SelectedItem): string {
  if (selectedItem.type === 'channel') {
    const channel = channels.find((c) => c.id === selectedItem.id)
    return `# ${channel?.name ?? 'unknown'}`
  }
  const dm = directMessages.find((d) => d.id === selectedItem.id)
  return `@ ${dm?.name ?? 'unknown'}`
}

export function ChatHeader({ channels, selectedItem, onSelectItem }: ChatHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectItem = (item: SelectedItem) => {
    onSelectItem(item)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center h-14 px-4 border-b gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h2 className="text-xl font-bold">{getHeaderTitle(channels, selectedItem)}</h2>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[260px] bg-[#611f69] text-white p-0">
          <SidebarContent channels={channels} selectedItem={selectedItem} onSelectItem={handleSelectItem} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
