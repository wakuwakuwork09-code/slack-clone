import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function MessageInput() {
  return (
    <div className="sticky bottom-0 border-t bg-background p-4">
      <div className="flex gap-2">
        <Input placeholder="メッセージを入力..." className="flex-1" />
        <Button>送信</Button>
      </div>
    </div>
  )
}
