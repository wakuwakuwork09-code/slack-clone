import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { SidebarContent } from '@/components/layout/sidebar'
import type { Channel } from '@/data/channels'
import { directMessages } from '@/data/dms'
import type { SelectedItem } from '@/App'

interface ChatHeaderProps {
  readonly channels: readonly Channel[]
  readonly selectedItem: SelectedItem
  readonly onSelect: (item: SelectedItem) => void
}

function getHeaderLabel(channels: readonly Channel[], selectedItem: SelectedItem): string {
  if (selectedItem.type === 'channel') {
    const ch = channels.find((c) => c.id === selectedItem.id)
    return `# ${ch?.name ?? 'unknown'}`
  }
  const dm = directMessages.find((d) => d.id === selectedItem.id)
  return `@ ${dm?.userName ?? 'unknown'}`
}

export function ChatHeader({ channels, selectedItem, onSelect }: ChatHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (item: SelectedItem) => {
    onSelect(item)
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

      <h2 className="text-xl font-bold">{getHeaderLabel(channels, selectedItem)}</h2>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-[260px] bg-[#611f69] text-white p-0"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">メニュー</SheetTitle>
          <SidebarContent channels={channels} selectedItem={selectedItem} onSelect={handleSelect} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
