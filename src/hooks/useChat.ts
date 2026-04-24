import { useState, useRef, useEffect } from 'react'
import type { Message } from '../types'
import { getBotResponse } from '../botResponses'
import { formatTime } from '../utils'

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: 'bot',
  text: 'こんにちは！社内サポートチャットです。IT・HR・経費に関するご質問にお答えします。何かお困りですか？',
  time: formatTime(),
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: trimmed, time: formatTime() },
    ])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: getBotResponse(trimmed), time: formatTime() },
      ])
      setTyping(false)
    }, 800)
  }

  return { messages, input, setInput, typing, send, bottomRef }
}
