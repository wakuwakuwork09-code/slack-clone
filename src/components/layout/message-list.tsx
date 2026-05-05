import { useEffect, useRef, useState } from 'react'
import { Pencil, Smile, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Message } from '@/data/messages'

const EMOJI_OPTIONS = ['👍', '❤️', '😂', '🎉', '😮'] as const

interface MessageListProps {
  readonly messages: readonly Message[]
  readonly onEdit: (id: string, newBody: string) => void
  readonly onDelete: (id: string) => void
  readonly onReact: (id: string, emoji: string) => void
}

function getInitials(name: string): string {
  return name.slice(0, 2)
}

export function MessageList({ messages, onEdit, onDelete, onReact }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editBody, setEditBody] = useState('')
  const [emojiOpenId, setEmojiOpenId] = useState<string | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleStartEdit = (msg: Message) => {
    setEditingId(msg.id)
    setEditBody(msg.body)
  }

  const handleSaveEdit = () => {
    if (editingId === null || !editBody.trim()) return
    onEdit(editingId, editBody.trim())
    setEditingId(null)
    setEditBody('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditBody('')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('削除しますか？')) {
      onDelete(id)
    }
  }

  const handleSelectEmoji = (msgId: string, emoji: string) => {
    onReact(msgId, emoji)
    setEmojiOpenId(null)
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        まだメッセージがありません
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        const reactionEntries = Object.entries(msg.reactions).filter(([, count]) => count > 0)

        return (
          <div key={msg.id} className="group relative flex gap-3">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarFallback className="text-xs">{getInitials(msg.userName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm">{msg.userName}</span>
                <span className="text-xs text-muted-foreground">{msg.createdAt}</span>
              </div>
              {editingId === msg.id ? (
                <div className="mt-1 space-y-2">
                  <textarea
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    rows={2}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveEdit}>保存</Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit}>キャンセル</Button>
                  </div>
                </div>
              ) : (
                <>
                  {msg.body && <p className="text-sm">{msg.body}</p>}
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="添付画像"
                      className="mt-1 max-w-xs rounded-lg"
                    />
                  )}
                </>
              )}
              {reactionEntries.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {reactionEntries.map(([emoji, count]) => (
                    <Badge
                      key={emoji}
                      variant="secondary"
                      className="cursor-pointer text-xs px-2 py-0.5"
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
                <Popover
                  open={emojiOpenId === msg.id}
                  onOpenChange={(open) => setEmojiOpenId(open ? msg.id : null)}
                >
                  <PopoverTrigger
                    className="inline-flex items-center justify-center rounded-md h-7 w-7 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <Smile className="h-3.5 w-3.5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="flex gap-1">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className="text-lg hover:bg-accent rounded p-1 cursor-pointer"
                          onClick={() => handleSelectEmoji(msg.id, emoji)}
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
                  onClick={() => handleStartEdit(msg)}
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
