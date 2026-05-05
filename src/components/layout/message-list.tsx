import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { messages } from '@/data/messages'

export function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-sm">{msg.user}</span>
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
            <p className="text-sm">{msg.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
