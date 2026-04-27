import { useEffect, useRef } from 'react';
import type { Message as MessageType, SuggestChip } from '../types';
import { Message } from './Message';
import { SuggestChips } from './SuggestChips';
import { InputArea } from './InputArea';
import styles from './ChatArea.module.css';

interface ChatAreaProps {
  messages: MessageType[];
  suggests: SuggestChip[];
  isTyping: boolean;
  onSend: (text: string) => void;
  categoryLabel: string;
}

export function ChatArea({ messages, suggests, isTyping, onSend, categoryLabel }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerIcon}>💬</span>
        <span className={styles.headerTitle}>{categoryLabel}</span>
      </header>

      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <Message
            key={msg.id}
            message={msg}
            isTyping={msg.role === 'bot' && idx === messages.length - 1 && isTyping}
          />
        ))}
        {isTyping && messages[messages.length - 1]?.role !== 'bot' && (
          <div className={styles.typingIndicator}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={styles.bottom}>
        <SuggestChips chips={suggests} onSelect={onSend} />
        <InputArea onSend={onSend} disabled={isTyping} />
      </div>
    </div>
  );
}
