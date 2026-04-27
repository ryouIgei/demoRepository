import { useEffect, useRef } from 'react'
import type { Message } from '../types'
import TypingIndicator from './TypingIndicator'

interface Props {
  messages: Message[]
  isTyping: boolean
}

export default function ChatWindow({ messages, isTyping }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div style={styles.window}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            ...styles.row,
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
          }}
        >
          {msg.sender === 'bot' && <span style={styles.avatar}>🤖</span>}
          <div
            style={{
              ...styles.bubble,
              ...(msg.sender === 'user' ? styles.userBubble : styles.botBubble),
            }}
          >
            <p style={styles.text}>{msg.text}</p>
            <p style={styles.time}>
              {msg.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {msg.sender === 'user' && <span style={styles.avatar}>🙂</span>}
        </div>
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  window: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 10,
  },
  avatar: {
    fontSize: 22,
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
    borderRadius: '50%',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '68%',
    padding: '12px 16px',
    borderRadius: 18,
    lineHeight: 1.55,
  },
  botBubble: {
    background: '#fff',
    border: '1px solid #e8e8e8',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    background: '#3b5bdb',
    color: '#fff',
    borderBottomRightRadius: 4,
  },
  text: { fontSize: 14, margin: 0 },
  time: { fontSize: 11, marginTop: 4, opacity: 0.55, textAlign: 'right' },
}
