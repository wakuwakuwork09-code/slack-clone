import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { messages } from '@/data/messages'
import type { SelectedItem } from '@/App'

interface MessageListProps {
  readonly selectedItem: SelectedItem
}

export function MessageList({ selectedItem }: MessageListProps) {
  const filtered = messages.filter(
    (msg) => msg.type === selectedItem.type && msg.parentId === selectedItem.id,
  )

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {filtered.map((msg) => (
        <div key={msg.id} className="flex gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="text-xs">
              {msg.userName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-sm">{msg.userName}</span>
              <span className="text-xs text-muted-foreground">{msg.createdAt}</span>
            </div>
            <p className="text-sm">{msg.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
