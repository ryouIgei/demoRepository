import styles from './Message.module.css'

export interface MessageData {
  id: string
  role: 'user' | 'bot'
  text: string
  typing?: boolean
}

interface MessageProps {
  message: MessageData
}

export function Message({ message }: MessageProps) {
  const isBot = message.role === 'bot'
  return (
    <div className={`${styles.wrapper} ${isBot ? styles.bot : styles.user}`}>
      {isBot && <div className={styles.avatar}>🤖</div>}
      <div className={`${styles.bubble} ${isBot ? styles.botBubble : styles.userBubble}`}>
        {message.typing ? (
          <div className={styles.typing}>
            <span /><span /><span />
          </div>
        ) : (
          <p className={styles.text}>{message.text}</p>
        )}
      </div>
    </div>
  )
}
