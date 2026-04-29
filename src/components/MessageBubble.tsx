import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.role === 'bot';
  return (
    <div className={`message-row${isBot ? ' message-row--bot' : ' message-row--user'}`}>
      {isBot && <div className="avatar avatar--bot">🤖</div>}
      <div className={`bubble${isBot ? ' bubble--bot' : ' bubble--user'}`}>
        {message.text}
      </div>
      {!isBot && <div className="avatar avatar--user">👤</div>}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="message-row message-row--bot">
      <div className="avatar avatar--bot">🤖</div>
      <div className="bubble bubble--bot bubble--typing">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
