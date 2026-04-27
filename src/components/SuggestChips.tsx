import { SuggestChip } from '../utils/botResponses'

interface SuggestChipsProps {
  chips: SuggestChip[]
  onSelect: (message: string) => void
}

export default function SuggestChips({ chips, onSelect }: SuggestChipsProps) {
  return (
    <div className="suggest-chips">
      {chips.map((chip) => (
        <button
          key={chip.label}
          className="chip"
          onClick={() => onSelect(chip.message)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
