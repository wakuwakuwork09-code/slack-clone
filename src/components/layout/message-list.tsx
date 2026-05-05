import type { SelectedItem } from '@/App'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { messages } from '@/data/messages'

interface MessageListProps {
  readonly selectedItem: SelectedItem
}

function getInitials(name: string): string {
  return name.slice(0, 2)
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
            <AvatarFallback className="text-xs">{getInitials(msg.userName)}</AvatarFallback>
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
