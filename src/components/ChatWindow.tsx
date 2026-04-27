import { useEffect, useRef } from 'react'
import type { CategoryId, Message } from '../types'
import { suggestChips } from '../data/botResponses'
import MessageBubble from './MessageBubble'
import SuggestChips from './SuggestChips'
import InputArea from './InputArea'

const CATEGORY_LABELS: Record<CategoryId, string> = {
  it: 'IT',
  account: 'アカウント',
  remote: 'リモート',
  leave: '休暇',
  salary: '給与',
  expense: '経費',
}

interface ChatWindowProps {
  categoryId: CategoryId
  messages: Message[]
  isTyping: boolean
  onSend: (text: string) => void
}

export default function ChatWindow({ categoryId, messages, isTyping, onSend }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const latestBotId = [...messages].reverse().find((m) => m.role === 'bot')?.id

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <span style={styles.headerTitle}>{CATEGORY_LABELS[categoryId]} サポート</span>
        <span style={styles.headerSub}>AIがご質問にお答えします</span>
      </header>

      <div style={styles.messages}>
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isLatestBot={msg.id === latestBotId}
          />
        ))}
        {isTyping && (
          <div style={styles.typingRow}>
            <div style={styles.avatar}>🤖</div>
            <div style={styles.typingBubble}>
              <span style={{ ...styles.dot, animationDelay: '0s' }} />
              <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
              <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <SuggestChips chips={suggestChips[categoryId]} onSelect={onSend} />
      <InputArea onSend={onSend} disabled={isTyping} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  header: {
    padding: '16px 24px',
    borderBottom: '1px solid #e8eaf0',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  headerTitle: { fontSize: 17, fontWeight: 700, color: '#1a1a2e' },
  headerSub: { fontSize: 12, color: '#9ea3b0' },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
  },
  typingRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#eef2ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    flexShrink: 0,
  },
  typingBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '12px 16px',
    background: '#ffffff',
    border: '1px solid #e8eaf0',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  dot: {
    display: 'inline-block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#c7d2fe',
    animation: 'bounce 1.2s infinite',
  },
}
