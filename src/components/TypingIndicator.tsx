import { useEffect, useState } from 'react'

export default function TypingIndicator() {
  const [dot, setDot] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setDot((d) => (d + 1) % 3), 400)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={styles.wrap}>
      <span style={styles.avatar}>🤖</span>
      <div style={styles.bubble}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              background: dot === i ? '#3b5bdb' : '#c5cae9',
            }}
          />
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 },
  avatar: {
    fontSize: 22,
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f4ff',
    borderRadius: '50%',
    flexShrink: 0,
  },
  bubble: {
    background: '#fff',
    border: '1px solid #e8e8e8',
    borderRadius: '18px 18px 18px 4px',
    padding: '12px 16px',
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    transition: 'background 0.3s',
  },
}
