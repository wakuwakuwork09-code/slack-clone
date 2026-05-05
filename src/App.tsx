import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { ChatHeader } from '@/components/layout/chat-header'
import { MessageList } from '@/components/layout/message-list'
import { MessageInput } from '@/components/layout/message-input'
import { supabase } from '@/lib/supabase'
import type { Message } from '@/data/messages'
import type { Channel } from '@/data/channels'

export interface SelectedItem {
  readonly type: 'channel' | 'dm'
  readonly id: string
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
      if (data.length > 0 && selectedItem === null) {
        setSelectedItem({ type: 'channel', id: data[0].id })
      }
    }
    fetchChannels()
  }, [])

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

    const mapped: Message[] = data.map((row) => ({
      id: row.id,
      type: 'channel' as const,
      parentId: row.channel_id,
      userName: row.user_name,
      body: row.content,
      createdAt: row.created_at,
      imageUrl: row.image_url ?? undefined,
      reactions: {},
    }))
    setMessages(mapped)
  }

  useEffect(() => {
    if (selectedItem === null || selectedItem.type !== 'channel') return
    fetchMessages(selectedItem.id)
  }, [selectedItem?.id, selectedItem?.type])

  const handleSend = async (body: string, imageFile?: File) => {
    if (selectedItem === null) return

    let imageUrl: string | undefined
    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const filePath = `${Date.now()}_${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('chat-images')
        .upload(filePath, imageFile, { contentType: imageFile.type })
      if (uploadError) {
        console.error('Failed to upload image:', uploadError)
        return
      }
      const { data: urlData } = supabase.storage
        .from('chat-images')
        .getPublicUrl(filePath)
      imageUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('messages').insert({
      content: body,
      channel_id: selectedItem.id,
      user_name: '自分',
      image_url: imageUrl ?? null,
    })

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

  if (selectedItem === null) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">読み込み中...</div>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar channels={channels} selectedItem={selectedItem} onSelectItem={setSelectedItem} />
      <div className="flex-1 flex flex-col">
        <ChatHeader channels={channels} selectedItem={selectedItem} onSelectItem={setSelectedItem} />
        <MessageList
          messages={messages}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReact={handleReact}
        />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  )
}

export default App
