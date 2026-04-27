import type { RefObject } from 'react'
import type { Message } from '../types'

type Props = {
  messages: Message[]
  typing: boolean
  bottomRef: RefObject<HTMLDivElement | null>
}

export function MessageList({ messages, typing, bottomRef }: Props) {
  return (
    <div className="messages">
      {messages.map(msg => (
        <div key={msg.id} className={`row ${msg.role}`}>
          {msg.role === 'bot' && <div className="bot-avatar">AI</div>}
          <div className="bubble-wrap">
            <div className="bubble">{msg.text}</div>
            <div className="time">{msg.time}</div>
          </div>
        </div>
      ))}
      {typing && (
        <div className="row bot">
          <div className="bot-avatar">AI</div>
          <div className="bubble-wrap">
            <div className="bubble typing"><span /><span /><span /></div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
