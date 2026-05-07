import { useEffect, useRef, useState } from 'react'
import { Pencil, Smile, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Message } from '@/data/messages'

const EMOJI_OPTIONS = ['\u{1F44D}', '\u2764\uFE0F', '\u{1F602}', '\u{1F389}', '\u{1F62E}'] as const

interface MessageListProps {
  readonly messages: readonly Message[]
  readonly onEdit: (id: string, newBody: string) => void
  readonly onDelete: (id: string) => void
  readonly onReact: (id: string, emoji: string) => void
}

export function MessageList({ messages, onEdit, onDelete, onReact }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editBody, setEditBody] = useState('')

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleEditStart = (msg: Message) => {
    setEditingId(msg.id)
    setEditBody(msg.body)
  }

  const handleEditSave = (id: string) => {
    if (!editBody.trim()) return
    onEdit(id, editBody.trim())
    setEditingId(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F')) {
      onDelete(id)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        const reactionEntries = Object.entries(msg.reactions).filter(([, count]) => count > 0)

        return (
          <div key={msg.id} className="group relative flex gap-3">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {msg.userName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm">{msg.userName}</span>
                <span className="text-xs text-muted-foreground">{msg.createdAt}</span>
              </div>
              {editingId === msg.id ? (
                <div className="mt-1 space-y-2">
                  <textarea
                    className="w-full rounded border p-2 text-sm resize-none"
                    rows={3}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEditSave(msg.id)}>保存</Button>
                    <Button size="sm" variant="ghost" onClick={handleEditCancel}>キャンセル</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm">{msg.body}</p>
              )}
              {reactionEntries.length > 0 && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {reactionEntries.map(([emoji, count]) => (
                    <Badge
                      key={emoji}
                      variant="secondary"
                      className="cursor-pointer select-none"
                      onClick={() => onReact(msg.id, emoji)}
                    >
                      {emoji} {count}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {editingId !== msg.id && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                <Popover>
                  <PopoverTrigger
                    render={<Button variant="ghost" size="icon" className="h-7 w-7" />}
                  >
                    <Smile className="h-3.5 w-3.5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" side="top" align="end">
                    <div className="flex gap-1">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className="text-lg hover:bg-muted rounded p-1 cursor-pointer"
                          onClick={() => onReact(msg.id, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleEditStart(msg)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleDelete(msg.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        )
      })}
      <div ref={endRef} />
    </div>
  )
}
