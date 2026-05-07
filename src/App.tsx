import { Sidebar } from '@/components/layout/sidebar'
import { ChatHeader } from '@/components/layout/chat-header'
import { MessageList } from '@/components/layout/message-list'
import { MessageInput } from '@/components/layout/message-input'

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </div>
    </div>
  )
}

export default App
