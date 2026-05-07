import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { SidebarContent } from '@/components/layout/sidebar'

export function ChatHeader() {
  const [isOpen, setIsOpen] = useState(false)

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

      <h2 className="text-xl font-bold"># general</h2>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-[260px] bg-[#611f69] text-white p-0"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">メニュー</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  )
}
