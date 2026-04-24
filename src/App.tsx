import { useChat } from './hooks/useChat'
import { AppHeader } from './components/AppHeader'
import { Sidebar } from './components/Sidebar'
import { MessageList } from './components/MessageList'
import { SuggestionChips } from './components/SuggestionChips'
import { ChatInput } from './components/ChatInput'
import './App.css'

const SUGGESTIONS = [
  'パスワードをリセットしたい',
  '経費精算の方法を知りたい',
  'VPN に接続できない',
  '有給を申請したい',
]

export default function App() {
  const { messages, input, setInput, typing, send, bottomRef } = useChat()

  return (
    <div className="app">
      <AppHeader />
      <div className="app-body">
        <Sidebar onSelect={send} />
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div className="agent-info">
              <div className="agent-avatar">AI</div>
              <div>
                <div className="agent-name">社内サポート AI</div>
                <div className="agent-status">
                  <span className="status-dot" />
                  オンライン対応中
                </div>
              </div>
            </div>
          </div>
          <MessageList messages={messages} typing={typing} bottomRef={bottomRef} />
          <SuggestionChips suggestions={SUGGESTIONS} onSelect={send} />
          <ChatInput input={input} typing={typing} onChange={setInput} onSend={send} />
        </div>
      </div>
    </div>
  )
}
