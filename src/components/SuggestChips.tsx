import { type SuggestChip } from '../data/responses'
import styles from './SuggestChips.module.css'

interface SuggestChipsProps {
  chips: SuggestChip[]
  color: string
  onSelect: (message: string) => void
}

export function SuggestChips({ chips, color, onSelect }: SuggestChipsProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>よくある質問</span>
      <div className={styles.chips}>
        {chips.map((chip) => (
          <button
            key={chip.label}
            className={styles.chip}
            style={{ borderColor: color, color }}
            onClick={() => onSelect(chip.message)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
