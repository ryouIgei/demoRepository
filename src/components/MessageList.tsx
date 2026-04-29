import type { RefObject } from 'react'
import type { Message } from '../types'
import { formatTime } from '../utils'

interface Props {
  messages: Message[]
  typing: boolean
  bottomRef: RefObject<HTMLDivElement>
}

export function MessageList({ messages, typing, bottomRef }: Props) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`message message--${msg.role}`}>
          {msg.role === 'bot' && <div className="avatar avatar--bot">🤖</div>}
          <div className="bubble-wrap">
            <div className="bubble">{msg.text}</div>
            <time className="timestamp">{formatTime(msg.timestamp)}</time>
          </div>
          {msg.role === 'user' && <div className="avatar avatar--user">👤</div>}
        </div>
      ))}
      {typing && (
        <div className="message message--bot">
          <div className="avatar avatar--bot">🤖</div>
          <div className="bubble-wrap">
            <div className="bubble typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
