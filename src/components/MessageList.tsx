import { type RefObject } from 'react';
import { type Message } from '../types';
import { formatTime } from '../utils';

interface Props {
  messages: Message[];
  typing: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, typing, bottomRef }: Props) {
  return (
    <div className="message-list">
      {messages.map(msg => (
        <div key={msg.id} className={`message message--${msg.role}`}>
          {msg.role === 'bot' && <span className="message__avatar">🤖</span>}
          <div className="message__bubble">
            <p className="message__text">{msg.text}</p>
            <span className="message__time">{formatTime(msg.timestamp)}</span>
          </div>
          {msg.role === 'user' && <span className="message__avatar">👤</span>}
        </div>
      ))}
      {typing && (
        <div className="message message--bot">
          <span className="message__avatar">🤖</span>
          <div className="message__bubble message__bubble--typing">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
