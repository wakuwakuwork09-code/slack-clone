import { type KeyboardEvent, useState } from 'react'
import { Button } from '@/components/ui/button'

interface MessageInputProps {
  readonly onSend: (body: string) => void
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="sticky bottom-0 border-t bg-background p-4 flex gap-2 items-end">
      <textarea
        className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        rows={1}
        placeholder="メッセージを入力..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSend}>送信</Button>
    </div>
  )
}
