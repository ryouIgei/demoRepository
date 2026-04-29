import type { KeyboardEvent } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled: boolean
}

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="chat-input">
      <textarea
        className="chat-textarea"
        placeholder="メッセージを入力… (Enter で送信)"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        rows={2}
      />
      <button className="send-btn" disabled={disabled || !value.trim()} onClick={onSend}>
        送信
      </button>
    </div>
  )
}
