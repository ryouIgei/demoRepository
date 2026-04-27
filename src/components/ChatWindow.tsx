import { useState, useRef, useEffect } from 'react'
import MessageBubble, { Message } from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import SuggestChips from './SuggestChips'
import ChatInput from './ChatInput'
import { Category, categoryChips, getBotResponse } from '../utils/botResponses'

interface ChatWindowProps {
  category: Category
}

const WELCOME: Record<Category, string> = {
  IT: 'IT サポートへようこそ！パスワードリセット、VPN、PC設定などお気軽にご質問ください。',
  アカウント: 'アカウント管理サポートへようこそ！アカウント作成・権限変更などご相談ください。',
  リモート: 'リモートワークサポートへようこそ！申請方法やVPN設定などお手伝いします。',
  休暇: '休暇サポートへようこそ！有休申請や残日数確認などお気軽にどうぞ。',
  給与: '給与サポートへようこそ！明細確認や振込先変更などご案内します。',
  経費: '経費サポートへようこそ！申請方法や領収書の扱いについてご説明します。',
}

function makeId() {
  return Math.random().toString(36).slice(2)
}

export default function ChatWindow({ category }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prevCategory = useRef<Category | null>(null)

  useEffect(() => {
    if (prevCategory.current === category) return
    prevCategory.current = category
    setMessages([
      {
        id: makeId(),
        role: 'bot',
        text: WELCOME[category],
        timestamp: new Date(),
      },
    ])
    setIsTyping(false)
  }, [category])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    const userMsg: Message = { id: makeId(), role: 'user', text, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const botMsg: Message = {
        id: makeId(),
        role: 'bot',
        text: getBotResponse(text),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }

  return (
    <main className="chat-window">
      <div className="chat-header">
        <span className="chat-category-label">{category}</span>
        <span className="chat-header-title">社内サポート AI</span>
      </div>

      <div className="messages-area">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <SuggestChips chips={categoryChips[category]} onSelect={handleSend} />
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </main>
  )
}
