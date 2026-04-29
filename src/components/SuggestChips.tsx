import type { SuggestChip } from '../types';

interface SuggestChipsProps {
  chips: SuggestChip[];
  onSelect: (message: string) => void;
}

export function SuggestChips({ chips, onSelect }: SuggestChipsProps) {
  if (chips.length === 0) return null;
  return (
    <div className="suggest-chips">
      {chips.map((chip) => (
        <button key={chip.label} className="chip" onClick={() => onSelect(chip.message)}>
          {chip.label}
        </button>
      ))}
    </div>
  );
}
