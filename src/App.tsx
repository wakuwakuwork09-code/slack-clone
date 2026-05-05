import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { ChatHeader } from '@/components/layout/chat-header'
import { MessageList } from '@/components/layout/message-list'
import { MessageInput } from '@/components/layout/message-input'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'
import type { Message } from '@/data/messages'
import type { Channel } from '@/data/channels'

interface DBMessageRow {
  readonly id: string
  readonly channel_id: string
  readonly user_id: string | null
  readonly user_name: string
  readonly content: string
  readonly created_at: string
  readonly image_url: string | null
}

function rowToMessage(row: DBMessageRow): Message {
  return {
    id: row.id,
    type: 'channel',
    parentId: row.channel_id,
    userId: row.user_id,
    userName: row.user_name,
    body: row.content,
    createdAt: row.created_at,
    imageUrl: row.image_url ?? undefined,
    reactions: {},
  }
}

export interface SelectedItem {
  readonly type: 'channel' | 'dm'
  readonly id: string
}

function App() {
  const { session } = useAuth()
  const [channels, setChannels] = useState<readonly Channel[]>([])
  const [joinedChannelIds, setJoinedChannelIds] = useState<ReadonlySet<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [messages, setMessages] = useState<readonly Message[]>([])

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

  const fetchMemberships = async () => {
    const { data, error } = await supabase.from('channel_members').select('channel_id')
    if (error) {
      console.error('Failed to fetch memberships:', error)
      return
    }
    setJoinedChannelIds(new Set(data.map((r) => r.channel_id)))
  }

  useEffect(() => {
    fetchChannels()
    fetchMemberships()
  }, [])

  const handleJoinChannel = async (channelId: string) => {
    if (!session) return
    const { error } = await supabase
      .from('channel_members')
      .insert({ channel_id: channelId, user_id: session.user.id })
      .select()
    if (error) {
      console.error('Failed to join channel:', error)
      return
    }
    await fetchMemberships()
    if (selectedItem?.id === channelId) {
      await fetchMessages(channelId)
    }
  }

  const handleLeaveChannel = async (channelId: string) => {
    if (!session) return
    const { error } = await supabase
      .from('channel_members')
      .delete()
      .eq('channel_id', channelId)
      .eq('user_id', session.user.id)
    if (error) {
      console.error('Failed to leave channel:', error)
      return
    }
    await fetchMemberships()
    if (selectedItem?.id === channelId) {
      setMessages([])
    }
  }

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

    const mapped: Message[] = (data as DBMessageRow[]).map(rowToMessage)
    setMessages(mapped)
  }

  useEffect(() => {
    if (selectedItem === null || selectedItem.type !== 'channel') return
    fetchMessages(selectedItem.id)
  }, [selectedItem?.id, selectedItem?.type])

  useEffect(() => {
    if (selectedItem === null || selectedItem.type !== 'channel') return
    const selectedChannelId = selectedItem.id

    const channel = supabase.channel(`messages:${selectedChannelId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const row = payload.new as DBMessageRow
        if (row.channel_id !== selectedChannelId) return
        const newMessage = rowToMessage(row)
        setMessages((prev) =>
          prev.some((m) => m.id === newMessage.id) ? prev : [...prev, newMessage]
        )
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [selectedItem?.id])

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
      user_id: session?.user.id ?? null,
      user_name: session?.user.email?.split('@')[0] ?? '自分',
      image_url: imageUrl ?? null,
    })

    if (error) {
      console.error('Failed to send message:', error)
    }
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
      <Sidebar channels={channels} joinedChannelIds={joinedChannelIds} selectedItem={selectedItem} onSelectItem={setSelectedItem} onJoinChannel={handleJoinChannel} onLeaveChannel={handleLeaveChannel} />
      <div className="flex-1 flex flex-col">
        <ChatHeader channels={channels} joinedChannelIds={joinedChannelIds} selectedItem={selectedItem} onSelectItem={setSelectedItem} onJoinChannel={handleJoinChannel} onLeaveChannel={handleLeaveChannel} />
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
