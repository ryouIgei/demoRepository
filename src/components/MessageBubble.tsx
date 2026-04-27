export interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const time = message.timestamp.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`message-row ${isUser ? 'user' : 'bot'}`}>
      {!isUser && <div className="avatar bot-avatar">🤖</div>}
      <div className="bubble-wrap">
        <div className={`bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
          {message.text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < message.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
        <div className={`timestamp ${isUser ? 'right' : 'left'}`}>{time}</div>
      </div>
      {isUser && <div className="avatar user-avatar">👤</div>}
    </div>
  )
}
