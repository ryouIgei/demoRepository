import { useEffect, useState } from 'react';
import type { Message as MessageType } from '../types';
import styles from './Message.module.css';

interface MessageProps {
  message: MessageType;
  isTyping?: boolean;
}

export function Message({ message, isTyping = false }: MessageProps) {
  const [displayed, setDisplayed] = useState(isTyping ? '' : message.text);

  useEffect(() => {
    if (!isTyping) {
      setDisplayed(message.text);
      return;
    }
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(message.text.slice(0, i));
      if (i >= message.text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [message.text, isTyping]);

  return (
    <div className={`${styles.wrapper} ${message.role === 'user' ? styles.user : styles.bot}`}>
      {message.role === 'bot' && <span className={styles.avatar}>🤖</span>}
      <div className={styles.bubble}>
        <p className={styles.text}>{displayed}</p>
        <span className={styles.time}>
          {message.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {message.role === 'user' && <span className={styles.avatar}>👤</span>}
    </div>
  );
}
