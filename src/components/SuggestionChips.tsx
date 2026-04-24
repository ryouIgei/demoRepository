type Props = {
  suggestions: string[]
  onSelect: (text: string) => void
}

export function SuggestionChips({ suggestions, onSelect }: Props) {
  return (
    <div className="suggestions">
      {suggestions.map(s => (
        <button key={s} className="chip" onClick={() => onSelect(s)}>
          {s}
        </button>
      ))}
    </div>
  )
}
