import { useState, useCallback } from 'react'
import type { Category, Message } from './types'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'
import { getBotResponse, getSuggestChips, getWelcomeMessage } from './botLogic'

function makeId() {
  return Math.random().toString(36).slice(2)
}

function makeWelcome(category: Category): Message {
  return {
    id: makeId(),
    sender: 'bot',
    text: getWelcomeMessage(category),
    timestamp: new Date(),
  }
}

export default function App() {
  const [category, setCategory] = useState<Category>('IT')
  const [messages, setMessages] = useState<Message[]>([makeWelcome('IT')])
  const [isTyping, setIsTyping] = useState(false)
  const chips = getSuggestChips(category)

  const handleSelectCategory = useCallback((cat: Category) => {
    setCategory(cat)
    setMessages([makeWelcome(cat)])
    setIsTyping(false)
  }, [])

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: Message = { id: makeId(), sender: 'user', text, timestamp: new Date() }
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      const delay = 800 + Math.random() * 600
      setTimeout(() => {
        const botMsg: Message = {
          id: makeId(),
          sender: 'bot',
          text: getBotResponse(text, category),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setIsTyping(false)
      }, delay)
    },
    [category],
  )

  return (
    <div style={styles.layout}>
      <Sidebar selected={category} onSelect={handleSelectCategory} />
      <div style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>{category} サポート</h1>
          <span style={styles.badge}>オンライン</span>
        </header>
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputArea chips={chips} onSend={handleSend} />
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: '#f5f5f5',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: '#fafafa',
  },
  header: {
    padding: '16px 24px',
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  badge: {
    fontSize: 12,
    background: '#e6f9f0',
    color: '#2e7d52',
    padding: '3px 10px',
    borderRadius: 12,
    fontWeight: 600,
  },
}
