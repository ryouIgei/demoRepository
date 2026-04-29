import './App.css';
import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { MessageList } from './components/MessageList';
import { SuggestionChips } from './components/SuggestionChips';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, input, setInput, typing, send, bottomRef } = useChat();

  return (
    <div className="app">
      <AppHeader />
      <div className="app__body">
        <Sidebar onSelect={send} />
        <main className="chat">
          <MessageList messages={messages} typing={typing} bottomRef={bottomRef} />
          <SuggestionChips onSelect={send} disabled={typing} />
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={send}
            disabled={typing}
          />
        </main>
      </div>
    </div>
  );
}
