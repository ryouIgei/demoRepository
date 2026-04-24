import { useChat } from './hooks/useChat'
import { ChatHeader } from './components/ChatHeader'
import { MessageList } from './components/MessageList'
import { SuggestionChips } from './components/SuggestionChips'
import { ChatInput } from './components/ChatInput'
import './App.css'

const SUGGESTIONS = [
  'パスワードをリセットしたい',
  '有給休暇を申請したい',
  '経費精算の方法を知りたい',
  'VPN に接続できない',
]

export default function App() {
  const { messages, input, setInput, typing, send, bottomRef } = useChat()

  return (
    <div className="chat-shell">
      <ChatHeader />
      <MessageList messages={messages} typing={typing} bottomRef={bottomRef} />
      <SuggestionChips suggestions={SUGGESTIONS} onSelect={send} />
      <ChatInput input={input} typing={typing} onChange={setInput} onSend={send} />
    </div>
  )
}
