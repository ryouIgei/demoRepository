import { useEffect, useState } from 'react'
import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
  isLatestBot: boolean
}

export default function MessageBubble({ message, isLatestBot }: MessageBubbleProps) {
  const isBot = message.role === 'bot'
  const [displayed, setDisplayed] = useState(isBot && isLatestBot ? '' : message.text)
  const [done, setDone] = useState(!isLatestBot || !isBot)

  useEffect(() => {
    if (!isBot || !isLatestBot) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(message.text.slice(0, i))
      if (i >= message.text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [message.text, isBot, isLatestBot])

  return (
    <div style={{ ...styles.row, justifyContent: isBot ? 'flex-start' : 'flex-end' }}>
      {isBot && <div style={styles.avatar}>🤖</div>}
      <div
        style={{
          ...styles.bubble,
          ...(isBot ? styles.botBubble : styles.userBubble),
        }}
      >
        <span>{displayed}</span>
        {isBot && isLatestBot && !done && <span style={styles.cursor}>|</span>}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#eef2ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '70%',
    padding: '10px 14px',
    borderRadius: 16,
    fontSize: 14,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  botBubble: {
    background: '#ffffff',
    border: '1px solid #e8eaf0',
    borderBottomLeftRadius: 4,
    color: '#1a1a2e',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  userBubble: {
    background: '#4f46e5',
    color: '#ffffff',
    borderBottomRightRadius: 4,
  },
  cursor: {
    display: 'inline-block',
    animation: 'blink 0.8s step-start infinite',
    marginLeft: 1,
    color: '#4f46e5',
    fontWeight: 700,
  },
}
