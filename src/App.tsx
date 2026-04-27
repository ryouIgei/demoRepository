import { useState, useCallback } from 'react'
import type { CategoryId, Message } from './types'
import { getBotResponse, categoryWelcome } from './data/botResponses'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'

function makeId() {
  return Math.random().toString(36).slice(2)
}

function makeWelcome(categoryId: CategoryId): Message {
  return { id: makeId(), role: 'bot', text: categoryWelcome[categoryId], timestamp: new Date() }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('it')
  const [chatHistory, setChatHistory] = useState<Record<CategoryId, Message[]>>({
    it: [makeWelcome('it')],
    account: [makeWelcome('account')],
    remote: [makeWelcome('remote')],
    leave: [makeWelcome('leave')],
    salary: [makeWelcome('salary')],
    expense: [makeWelcome('expense')],
  })
  const [isTyping, setIsTyping] = useState(false)

  const messages = chatHistory[activeCategory]

  const handleSend = useCallback((text: string) => {
    const userMsg: Message = { id: makeId(), role: 'user', text, timestamp: new Date() }

    setChatHistory((prev) => ({
      ...prev,
      [activeCategory]: [...prev[activeCategory], userMsg],
    }))

    setIsTyping(true)

    const delay = 600 + Math.random() * 800
    setTimeout(() => {
      const responseText = getBotResponse(activeCategory, text)
      const botMsg: Message = { id: makeId(), role: 'bot', text: responseText, timestamp: new Date() }
      setChatHistory((prev) => ({
        ...prev,
        [activeCategory]: [...prev[activeCategory], botMsg],
      }))
      setIsTyping(false)
    }, delay)
  }, [activeCategory])

  const handleSelectCategory = useCallback((id: CategoryId) => {
    setActiveCategory(id)
    setIsTyping(false)
  }, [])

  return (
    <>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        div[style*="dot"]:nth-child(2) { animation-delay: 0.2s; }
        div[style*="dot"]:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <div style={styles.app}>
        <Sidebar activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
        <ChatWindow
          categoryId={activeCategory}
          messages={messages}
          isTyping={isTyping}
          onSend={handleSend}
        />
      </div>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    height: '100vh',
    background: '#f5f6fa',
  },
}
