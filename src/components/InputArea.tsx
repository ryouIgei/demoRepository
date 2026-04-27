import { useState, type KeyboardEvent } from 'react'

interface InputAreaProps {
  onSend: (text: string) => void
  disabled: boolean
}

export default function InputArea({ onSend, disabled }: InputAreaProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        type="text"
        placeholder="メッセージを入力…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        style={{
          ...styles.button,
          ...(disabled || !value.trim() ? styles.buttonDisabled : {}),
        }}
        onClick={handleSend}
        disabled={disabled || !value.trim()}
      >
        送信
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 8,
    padding: '12px 16px',
    borderTop: '1px solid #e8eaf0',
    background: '#ffffff',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 24,
    border: '1.5px solid #e8eaf0',
    fontSize: 14,
    outline: 'none',
    background: '#f9fafb',
    color: '#1a1a2e',
    transition: 'border-color 0.15s',
  },
  button: {
    padding: '10px 20px',
    borderRadius: 24,
    background: '#4f46e5',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    transition: 'background 0.15s',
  },
  buttonDisabled: {
    background: '#c7d2fe',
    cursor: 'not-allowed',
  },
}
