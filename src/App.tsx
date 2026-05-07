import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { ChatHeader } from '@/components/layout/chat-header'
import { MessageList } from '@/components/layout/message-list'
import { MessageInput } from '@/components/layout/message-input'
import { channels } from '@/data/channels'
import { messages as initialMessages, type Message } from '@/data/messages'

export interface SelectedItem {
  readonly type: 'channel' | 'dm'
  readonly id: string
}

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: 'channel',
    id: channels[0].id,
  })
  const [messages, setMessages] = useState<readonly Message[]>(initialMessages)

  const handleSend = (body: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      type: selectedItem.type,
      parentId: selectedItem.id,
      userName: '自分',
      body,
      createdAt: new Date().toISOString(),
      reactions: {},
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleEdit = (id: string, newBody: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, body: newBody } : m)),
    )
  }

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const handleReact = (id: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, reactions: { ...m.reactions, [emoji]: (m.reactions[emoji] ?? 0) + 1 } }
          : m,
      ),
    )
  }

  const filtered = messages.filter(
    (msg) => msg.type === selectedItem.type && msg.parentId === selectedItem.id,
  )

  return (
    <div className="flex min-h-screen">
      <Sidebar selectedItem={selectedItem} onSelect={setSelectedItem} />
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedItem={selectedItem} onSelect={setSelectedItem} />
        <MessageList messages={filtered} onEdit={handleEdit} onDelete={handleDelete} onReact={handleReact} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  )
}

export default App
