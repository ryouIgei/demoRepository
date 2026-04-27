import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-input-wrap">
      <textarea
        className="chat-textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="質問を入力してください（Enterで送信、Shift+Enterで改行）"
        disabled={disabled}
        rows={2}
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
      >
        送信
      </button>
    </div>
  )
}
