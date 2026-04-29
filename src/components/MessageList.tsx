import { type Message } from '../types';
import { formatTime } from '../utils';

interface MessageListProps {
  messages: Message[];
  typing: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, typing, bottomRef }: MessageListProps) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`message message--${msg.role}`}>
          {msg.role === 'bot' && <div className="message__avatar">🤖</div>}
          <div className="message__bubble">
            <p className="message__text">{msg.text}</p>
            <span className="message__time">{formatTime(msg.timestamp)}</span>
          </div>
          {msg.role === 'user' && <div className="message__avatar message__avatar--user">👤</div>}
        </div>
      ))}
      {typing && (
        <div className="message message--bot">
          <div className="message__avatar">🤖</div>
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
