import { useState, useRef } from 'react'
import type { Message } from '../types'
import { formatTime } from '../utils'
import { getResponse } from '../botResponses'

const INITIAL: Message = {
  id: 0,
  role: 'bot',
  text: 'こんにちは！社内サポートチャットです。IT・HR・経費に関するご質問にお答えします。何かお困りですか？',
  time: formatTime(new Date()),
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const nextId = useRef(1)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = {
      id: nextId.current++,
      role: 'user',
      text: trimmed,
      time: formatTime(new Date()),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: nextId.current++,
        role: 'bot',
        text: getResponse(trimmed),
        time: formatTime(new Date()),
      }
      setMessages(prev => [...prev, botMsg])
      setTyping(false)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }, 900)
  }

  return { messages, input, setInput, typing, send, bottomRef }
}
