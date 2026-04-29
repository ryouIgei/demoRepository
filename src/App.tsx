import './App.css';
import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { MessageList } from './components/MessageList';
import { SuggestionChips } from './components/SuggestionChips';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, input, setInput, typing, send, bottomRef } = useChat();

  const handleSelect = (text: string) => send(text);

  return (
    <div className="app">
      <AppHeader />
      <div className="app-body">
        <Sidebar onSelect={handleSelect} />
        <main className="chat-area">
          <MessageList messages={messages} typing={typing} bottomRef={bottomRef} />
          <SuggestionChips onSelect={handleSelect} />
          <ChatInput input={input} setInput={setInput} send={send} typing={typing} />
        </main>
      </div>
    </div>
  );
}
