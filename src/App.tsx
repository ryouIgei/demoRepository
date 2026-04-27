import { useState, useRef, useEffect } from 'react'
import { getBotResponse, categories } from './botLogic'
import type { Category } from './botLogic'
import './App.css'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
}

const CATEGORY_ICONS: Record<string, string> = {
  IT: '💻',
  アカウント: '🔑',
  リモート: '🏠',
  休暇: '🌴',
  給与: '💴',
  経費: '🧾',
}

let msgId = 0

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId++,
      role: 'bot',
      text: 'こんにちは！社内サポートAIです。\nカテゴリを選ぶか、お困りの内容を入力してください。',
    },
  ])
  const [suggestions, setSuggestions] = useState<string[]>(['パスワードリセット', '有給申請', '経費精算'])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const addBotMessage = (text: string, nextSuggestions: string[]) => {
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: msgId++, role: 'bot', text }])
      setSuggestions(nextSuggestions)
      setTyping(false)
    }, 900)
  }

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: msgId++, role: 'user', text: trimmed }])
    setInput('')
    const res = getBotResponse(trimmed, activeCategory)
    addBotMessage(res.text, res.suggestions)
  }

  const handleCategory = (cat: Category) => {
    setActiveCategory(cat)
    setMessages((prev) => [...prev, { id: msgId++, role: 'user', text: `【${cat}】について知りたい` }])
    const res = getBotResponse('', cat)
    addBotMessage(res.text, res.suggestions)
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">🤖</span>
          <span>社内サポート</span>
        </div>
        <nav className="category-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => handleCategory(cat)}
            >
              <span className="cat-icon">{CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main chat area */}
      <main className="chat-area">
        <header className="chat-header">
          {activeCategory ? `${CATEGORY_ICONS[activeCategory]} ${activeCategory}` : '社内サポートAI'}
        </header>

        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`bubble-row ${msg.role}`}>
              {msg.role === 'bot' && <span className="avatar">🤖</span>}
              <div className={`bubble ${msg.role}`}>
                {msg.text.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}

          {typing && (
            <div className="bubble-row bot">
              <span className="avatar">🤖</span>
              <div className="bubble bot typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="suggestions">
          {suggestions.map((s) => (
            <button key={s} className="chip" onClick={() => handleSend(s)}>
              {s}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="input-bar">
          <input
            className="text-input"
            type="text"
            placeholder="質問を入力してください..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          />
          <button className="send-btn" onClick={() => handleSend(input)}>送信</button>
        </div>
      </main>
    </div>
  )
}
