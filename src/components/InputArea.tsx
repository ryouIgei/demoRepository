import { useState } from 'react'

interface Props {
  chips: string[]
  onSend: (text: string) => void
}

export default function InputArea({ chips, onSend }: Props) {
  const [value, setValue] = useState('')

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.chips}>
        {chips.map((chip) => (
          <button key={chip} style={styles.chip} onClick={() => submit(chip)}>
            {chip}
          </button>
        ))}
      </div>
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && submit(value)}
          placeholder="メッセージを入力..."
        />
        <button
          style={{
            ...styles.sendBtn,
            ...(value.trim() ? {} : styles.sendBtnDisabled),
          }}
          onClick={() => submit(value)}
          disabled={!value.trim()}
        >
          送信
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: '12px 20px 20px',
    background: '#fff',
    borderTop: '1px solid #e8e8e8',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    padding: '6px 14px',
    background: '#f0f4ff',
    color: '#3b5bdb',
    border: '1px solid #c5cae9',
    borderRadius: 20,
    fontSize: 13,
    cursor: 'pointer',
    transition: 'background 0.15s',
    whiteSpace: 'nowrap',
  },
  inputRow: {
    display: 'flex',
    gap: 10,
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    border: '1px solid #e8e8e8',
    borderRadius: 24,
    fontSize: 14,
    outline: 'none',
    background: '#fafafa',
  },
  sendBtn: {
    padding: '10px 22px',
    background: '#3b5bdb',
    color: '#fff',
    border: 'none',
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  sendBtnDisabled: {
    background: '#c5cae9',
    cursor: 'not-allowed',
  },
}
