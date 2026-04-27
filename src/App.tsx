import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import SuggestChips from './components/SuggestChips'
import InputBar from './components/InputBar'
import { getBotResponse, suggestsByCategory, categoryIcons } from './bot/responses'
import type { Category } from './bot/responses'
import styles from './App.module.css'

export interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
}

let idSeq = 0
const nextId = () => ++idSeq

const greeting = (cat: Category): Message => ({
  id: nextId(),
  role: 'bot',
  text: `${categoryIcons[cat]} **${cat}** カテゴリへようこそ！\nよくある質問をチップから選ぶか、自由にご入力ください。`,
})

export default function App() {
  const [category, setCategory] = useState<Category>('IT')
  const [messages, setMessages] = useState<Message[]>([greeting('IT')])
  const [isTyping, setIsTyping] = useState(false)

  const handleCategory = useCallback((cat: Category) => {
    setCategory(cat)
    setMessages([greeting(cat)])
    setIsTyping(false)
  }, [])

  const sendMessage = useCallback((text: string) => {
    const userMsg: Message = { id: nextId(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const botText = getBotResponse(text, category)
      const botMsg: Message = { id: nextId(), role: 'bot', text: botText }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }, [category])

  return (
    <div className={styles.layout}>
      <Sidebar active={category} onSelect={handleCategory} />
      <div className={styles.main}>
        <header className={styles.header}>
          <span className={styles.headerIcon}>{categoryIcons[category]}</span>
          <div>
            <h1 className={styles.headerTitle}>{category} サポート</h1>
            <p className={styles.headerSub}>AIが社内の疑問にお答えします</p>
          </div>
        </header>
        <ChatArea messages={messages} isTyping={isTyping} />
        <SuggestChips chips={suggestsByCategory[category]} onSelect={sendMessage} />
        <InputBar onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
