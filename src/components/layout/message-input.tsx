import { type KeyboardEvent, useRef, useState } from 'react'
import { Paperclip, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MessageInputProps {
  readonly onSend: (body: string, imageFile?: File) => void
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [input, setInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (!input.trim() && !imageFile) return
    onSend(input.trim(), imageFile ?? undefined)
    setInput('')
    clearImage()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    e.target.value = ''
  }

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <div className="sticky bottom-0 border-t bg-background p-4">
      {imagePreview && (
        <div className="relative mb-2 inline-block">
          <img
            src={imagePreview}
            alt="プレビュー"
            className="h-20 w-20 rounded-md object-cover border"
          />
          <button
            type="button"
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground cursor-pointer"
            onClick={clearImage}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      <div className="flex gap-2 items-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 flex-shrink-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
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
    </div>
  )
}
