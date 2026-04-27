interface SuggestChipsProps {
  chips: string[]
  onSelect: (text: string) => void
}

export default function SuggestChips({ chips, onSelect }: SuggestChipsProps) {
  return (
    <div style={styles.container}>
      {chips.map((chip) => (
        <button key={chip} style={styles.chip} onClick={() => onSelect(chip)}>
          {chip}
        </button>
      ))}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    padding: '8px 16px',
  },
  chip: {
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 13,
    border: '1px solid #c7d2fe',
    background: '#eef2ff',
    color: '#4f46e5',
    fontWeight: 500,
    transition: 'background 0.15s, border-color 0.15s',
    cursor: 'pointer',
  },
}
