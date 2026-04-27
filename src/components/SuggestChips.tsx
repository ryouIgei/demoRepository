import styles from './SuggestChips.module.css'

interface Props {
  chips: string[]
  onSelect: (chip: string) => void
}

export default function SuggestChips({ chips, onSelect }: Props) {
  return (
    <div className={styles.chips}>
      {chips.map((chip) => (
        <button key={chip} className={styles.chip} onClick={() => onSelect(chip)}>
          {chip}
        </button>
      ))}
    </div>
  )
}
