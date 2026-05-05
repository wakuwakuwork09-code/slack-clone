import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function MessageInput() {
  return (
    <div className="sticky bottom-0 border-t bg-background p-4 flex gap-2">
      <Input
        className="flex-1"
        placeholder="# general にメッセージを送信"
      />
      <Button>送信</Button>
    </div>
  )
}
