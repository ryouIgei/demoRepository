import { useEffect, useRef } from 'react'
import type { Message } from '../App'
import styles from './ChatArea.module.css'

interface Props {
  messages: Message[]
  isTyping: boolean
}

export default function ChatArea({ messages, isTyping }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className={styles.chatArea}>
      {messages.map((msg) => (
        <div key={msg.id} className={`${styles.row} ${msg.role === 'user' ? styles.userRow : styles.botRow}`}>
          {msg.role === 'bot' && (
            <div className={styles.avatar}>🤖</div>
          )}
          <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.botBubble}`}>
            {msg.text}
          </div>
          {msg.role === 'user' && (
            <div className={styles.avatar}>👤</div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className={`${styles.row} ${styles.botRow}`}>
          <div className={styles.avatar}>🤖</div>
          <div className={`${styles.bubble} ${styles.botBubble} ${styles.typingBubble}`}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
