export interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  return (
    <div style={{ ...styles.row, justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && <div style={styles.avatar}>🤖</div>}
      <div
        style={{
          ...styles.bubble,
          ...(isUser ? styles.userBubble : styles.botBubble),
        }}
      >
        {message.text}
      </div>
      {isUser && <div style={styles.userAvatar}>👤</div>}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
  },
  avatar: {
    fontSize: 24,
    flexShrink: 0,
    lineHeight: 1,
  },
  userAvatar: {
    fontSize: 22,
    flexShrink: 0,
    lineHeight: 1,
  },
  bubble: {
    maxWidth: '68%',
    padding: '11px 15px',
    borderRadius: 18,
    fontSize: 14,
    lineHeight: 1.65,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  botBubble: {
    background: '#ffffff',
    border: '1px solid #e8eaf0',
    borderBottomLeftRadius: 4,
    color: '#1a1a2e',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  userBubble: {
    background: '#4f46e5',
    color: '#ffffff',
    borderBottomRightRadius: 4,
  },
}
