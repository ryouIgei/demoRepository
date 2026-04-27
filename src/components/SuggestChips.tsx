import type { SuggestChip } from '../types';
import styles from './SuggestChips.module.css';

interface SuggestChipsProps {
  chips: SuggestChip[];
  onSelect: (query: string) => void;
}

export function SuggestChips({ chips, onSelect }: SuggestChipsProps) {
  return (
    <div className={styles.container}>
      {chips.map((chip) => (
        <button
          key={chip.label}
          className={styles.chip}
          onClick={() => onSelect(chip.query)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
