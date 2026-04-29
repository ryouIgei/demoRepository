import { useState, useRef, useCallback } from 'react';
import { type Message } from '../types';
import { getResponse } from '../botResponses';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'bot',
      text: 'こんにちは！社内サポートアシスタントです。お困りのことがあればお気軽にご相談ください。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setTyping(true);
      setTimeout(scrollToBottom, 50);

      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: getResponse(trimmed),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
      setTimeout(scrollToBottom, 50);
    },
    [typing]
  );

  return { messages, input, setInput, typing, send, bottomRef };
}
