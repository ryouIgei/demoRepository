import { useEffect, useRef, useState } from 'react'
import { Category, categoryChips, getBotResponse } from '../data/botResponses'
import ChatMessage, { Message } from './ChatMessage'
import TypingIndicator from './TypingIndicator'

interface ChatWindowProps {
  category: Category
}

let msgIdCounter = 0
const makeId = () => `msg-${++msgIdCounter}`

const WELCOME: Message = {
  id: 'welcome',
  role: 'bot',
  text: 'こんにちは！社内サポート AI です。\n下のカテゴリからよくある質問を選ぶか、テキストで質問を入力してください。',
}

export default function ChatWindow({ category }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: makeId(), role: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const botMsg: Message = {
        id: makeId(),
        role: 'bot',
        text: getBotResponse(text.trim()),
      }
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, 1200 + Math.random() * 600)
  }

  const chips = categoryChips[category]

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <p style={styles.headerTitle}>社内サポート AI</p>
          <p style={styles.headerSub}>カテゴリ: {category}</p>
        </div>
        <span style={styles.badge}>● オンライン</span>
      </header>

      <div style={styles.messages}>
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>🤖</span>
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={styles.chips}>
        {chips.map((chip) => (
          <button key={chip.query} style={styles.chip} onClick={() => sendMessage(chip.query)}>
            {chip.label}
          </button>
        ))}
      </div>

      <form
        style={styles.inputArea}
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
      >
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力してください…"
        />
        <button type="submit" style={styles.sendBtn} disabled={!input.trim()}>
          送信
        </button>
      </form>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
    background: '#ffffff',
    borderBottom: '1px solid #e8eaf0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  headerSub: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  badge: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: 600,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    padding: '10px 24px',
    borderTop: '1px solid #e8eaf0',
    background: '#fafbff',
  },
  chip: {
    padding: '6px 14px',
    borderRadius: 20,
    border: '1px solid #c7d2fe',
    background: '#eef2ff',
    color: '#4f46e5',
    fontSize: 13,
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.15s',
  },
  inputArea: {
    display: 'flex',
    gap: 10,
    padding: '14px 24px',
    borderTop: '1px solid #e8eaf0',
    background: '#ffffff',
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 24,
    border: '1px solid #e8eaf0',
    fontSize: 14,
    outline: 'none',
    background: '#f5f6fa',
    color: '#1a1a2e',
  },
  sendBtn: {
    padding: '10px 22px',
    borderRadius: 24,
    border: 'none',
    background: '#4f46e5',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
}
