import { useState, useRef, useCallback } from 'react';
import type { Message } from '../types';
import { getResponse } from '../botResponses';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'bot',
      text: 'こんにちは！社内サポートチャットボットです。お困りのことをお気軽にご相談ください。',
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
    (text?: string) => {
      const msgText = (text ?? input).trim();
      if (!msgText || typing) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: msgText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setTyping(true);

      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: getResponse(msgText),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
        setTimeout(scrollToBottom, 50);
      }, 1000);

      setTimeout(scrollToBottom, 50);
    },
    [input, typing]
  );

  return { messages, input, setInput, typing, send, bottomRef };
}
