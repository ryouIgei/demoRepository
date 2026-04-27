import { useState, useRef, useEffect, useCallback } from 'react'
import { Message, type MessageData } from './Message'
import { SuggestChips } from './SuggestChips'
import { type CategoryConfig, getBotResponse } from '../data/responses'
import styles from './ChatArea.module.css'

interface ChatAreaProps {
  category: CategoryConfig
}

let msgIdCounter = 0
function newId() { return String(++msgIdCounter) }

const WELCOME: MessageData = {
  id: '0',
  role: 'bot',
  text: 'こんにちは！社内サポートAIです 👋\nカテゴリを選ぶか、以下のよくある質問をクリック、またはメッセージを入力してください。',
}

export function ChatArea({ category }: ChatAreaProps) {
  const [messages, setMessages] = useState<MessageData[]>([WELCOME])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prevCategoryRef = useRef(category.id)

  useEffect(() => {
    if (prevCategoryRef.current !== category.id) {
      prevCategoryRef.current = category.id
      const switchMsg: MessageData = {
        id: newId(),
        role: 'bot',
        text: `${category.icon} **${category.id}** カテゴリに切り替えました。\n以下のよくある質問か、自由にご質問ください。`,
      }
      setMessages((prev) => [...prev, switchMsg])
    }
  }, [category])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return
    const userMsg: MessageData = { id: newId(), role: 'user', text: text.trim() }
    const typingMsg: MessageData = { id: newId(), role: 'bot', text: '', typing: true }

    setMessages((prev) => [...prev, userMsg, typingMsg])
    setInput('')
    setIsTyping(true)

    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const reply = getBotResponse(text)
      setMessages((prev) =>
        prev.map((m) => (m.typing ? { ...m, text: reply, typing: false } : m))
      )
      setIsTyping(false)
    }, delay)
  }, [isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.categoryBadge} style={{ background: `${category.color}18`, color: category.color }}>
          <span>{category.icon}</span>
          <span>{category.id}</span>
        </div>
        <div className={styles.topBarTitle}>社内サポートチャット</div>
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <SuggestChips
        chips={category.chips}
        color={category.color}
        onSelect={sendMessage}
      />

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="メッセージを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
        />
        <button
          className={styles.sendBtn}
          type="submit"
          disabled={!input.trim() || isTyping}
          style={{ background: category.color }}
        >
          ➤
        </button>
      </form>
    </div>
  )
}
