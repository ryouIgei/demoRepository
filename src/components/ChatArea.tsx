import { useEffect, useRef, useState } from 'react';
import type { Category, Message, SuggestChip } from '../types';
import { getAutoResponse, categorySuggestions, categoryGreeting } from '../data/responses';
import { MessageBubble, TypingIndicator } from './MessageBubble';
import { SuggestChips } from './SuggestChips';

interface ChatAreaProps {
  category: Category;
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

export function ChatArea({ category }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<SuggestChip[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: makeId(),
        role: 'bot',
        text: categoryGreeting[category],
        timestamp: new Date(),
      },
    ]);
    setChips(categorySuggestions[category]);
    setInput('');
    setTyping(false);
  }, [category]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: Message = { id: makeId(), role: 'user', text: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setChips([]);
    setInput('');
    setTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const botText = getAutoResponse(category, trimmed);
      const botMsg: Message = { id: makeId(), role: 'bot', text: botText, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="chat-area">
      <header className="chat-header">
        <span className="chat-header-title">{category} サポート</span>
      </header>

      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <SuggestChips chips={chips} onSelect={sendMessage} />

      <div className="input-bar">
        <textarea
          className="input-field"
          rows={1}
          placeholder="メッセージを入力… (Enter で送信)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="send-btn"
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || typing}
        >
          送信
        </button>
      </div>
    </div>
  );
}
