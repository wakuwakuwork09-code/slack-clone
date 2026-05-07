import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { ChatHeader } from '@/components/layout/chat-header'
import { MessageList } from '@/components/layout/message-list'
import { MessageInput } from '@/components/layout/message-input'
import { supabase } from '@/lib/supabase'
import type { Channel } from '@/data/channels'
import type { Message } from '@/data/messages'

export interface SelectedItem {
  readonly type: 'channel' | 'dm'
  readonly id: string
}

function toMessage(row: { id: string; channel_id: string; user_name: string; content: string; created_at: string }): Message {
  return {
    id: row.id,
    type: 'channel',
    parentId: row.channel_id,
    userName: row.user_name,
    body: row.content,
    createdAt: row.created_at,
    reactions: {},
  }
}

function App() {
  const [channels, setChannels] = useState<readonly Channel[]>([])
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [messages, setMessages] = useState<readonly Message[]>([])

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase.from('channels').select('*')
      if (error) {
        console.error('Failed to fetch channels:', error)
        return
      }
      setChannels(data)
      if (data.length > 0 && !selectedItem) {
        setSelectedItem({ type: 'channel', id: data[0].id })
      }
    }
    fetchChannels()
  }, [])

  useEffect(() => {
    if (!selectedItem || selectedItem.type !== 'channel') return
    fetchMessages(selectedItem.id)
  }, [selectedItem?.id, selectedItem?.type])

  const fetchMessages = async (channelId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('channel_id', channelId)
      .order('created_at', { ascending: true })
    if (error) {
      console.error('Failed to fetch messages:', error)
      return
    }
    setMessages(data.map(toMessage))
  }

  const handleSend = async (body: string) => {
    if (!selectedItem || selectedItem.type !== 'channel') return
    const { error } = await supabase
      .from('messages')
      .insert({ content: body, channel_id: selectedItem.id, user_name: '自分' })
    if (error) {
      console.error('Failed to send message:', error)
      return
    }
    await fetchMessages(selectedItem.id)
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

  if (!selectedItem) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar channels={channels} selectedItem={selectedItem} onSelect={setSelectedItem} />
      <div className="flex-1 flex flex-col">
        <ChatHeader channels={channels} selectedItem={selectedItem} onSelect={setSelectedItem} />
        <MessageList messages={messages} onEdit={handleEdit} onDelete={handleDelete} onReact={handleReact} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  )
}

export default App
