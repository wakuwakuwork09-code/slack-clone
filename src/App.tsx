import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { ChatHeader } from '@/components/layout/chat-header'
import { MessageList } from '@/components/layout/message-list'
import { MessageInput } from '@/components/layout/message-input'
import { channels } from '@/data/channels'

export interface SelectedItem {
  readonly type: 'channel' | 'dm'
  readonly id: string
}

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: 'channel',
    id: channels[0].id,
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar selectedItem={selectedItem} onSelectItem={setSelectedItem} />
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedItem={selectedItem} onSelectItem={setSelectedItem} />
        <MessageList selectedItem={selectedItem} />
        <MessageInput />
      </div>
    </div>
  )
}

export default App
