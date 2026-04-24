import { useState, useRef, useEffect } from 'react'
import { getBotResponse } from './botResponses'
import './App.css'

type Message = {
  id: number
  role: 'user' | 'bot'
  text: string
  time: string
}

function now() {
  return new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
}

const SUGGESTIONS = ['パスワードをリセットしたい', '有給休暇を申請したい', '経費精算の方法を知りたい', 'VPN に接続できない']

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: 'こんにちは！社内サポートチャットです。IT・HR・経費に関するご質問にお答えします。何かお困りですか？',
      time: now(),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    const userMsg: Message = { id: Date.now(), role: 'user', text: trimmed, time: now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: getBotResponse(trimmed),
        time: now(),
      }
      setMessages(prev => [...prev, botMsg])
      setTyping(false)
    }, 800)
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <div className="avatar bot-avatar">S</div>
        <div>
          <div className="header-name">社内サポート AI</div>
          <div className="header-status">● オンライン</div>
        </div>
      </header>

      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`row ${msg.role}`}>
            {msg.role === 'bot' && <div className="avatar bot-avatar sm">S</div>}
            <div className="bubble-wrap">
              <div className="bubble">{msg.text}</div>
              <div className="time">{msg.time}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="row bot">
            <div className="avatar bot-avatar sm">S</div>
            <div className="bubble-wrap">
              <div className="bubble typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="suggestions">
        {SUGGESTIONS.map(s => (
          <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
        ))}
      </div>

      <form
        className="input-bar"
        onSubmit={e => { e.preventDefault(); send(input) }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          disabled={typing}
        />
        <button type="submit" disabled={!input.trim() || typing}>送信</button>
      </form>
    </div>
  )
}
