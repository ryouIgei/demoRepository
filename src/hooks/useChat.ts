import { useState, useRef, useCallback } from 'react'
import type { Message } from '../types'
import { getResponse } from '../botResponses'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'bot',
      text: 'こんにちは！社内サポートチャットです。お困りのことをご入力ください。',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const send = useCallback(
    (text?: string) => {
      const content = (text ?? input).trim()
      if (!content || typing) return

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: content,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setTyping(true)
      setTimeout(scrollToBottom, 50)

      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: getResponse(content),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setTyping(false)
        setTimeout(scrollToBottom, 50)
      }, 1200)
    },
    [input, typing],
  )

  return { messages, input, setInput, typing, send, bottomRef }
}
