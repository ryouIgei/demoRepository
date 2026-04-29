import './App.css'
import { AppHeader } from './components/AppHeader'
import { Sidebar } from './components/Sidebar'
import { MessageList } from './components/MessageList'
import { SuggestionChips } from './components/SuggestionChips'
import { ChatInput } from './components/ChatInput'
import { useChat } from './hooks/useChat'

function App() {
  const { messages, input, setInput, typing, send, bottomRef } = useChat()

  return (
    <div className="app">
      <AppHeader />
      <div className="app-body">
        <Sidebar onSelect={(text) => send(text)} />
        <main className="chat-area">
          <MessageList messages={messages} typing={typing} bottomRef={bottomRef} />
          <div className="chat-footer">
            <SuggestionChips onSelect={(text) => send(text)} disabled={typing} />
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => send()}
              disabled={typing}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
