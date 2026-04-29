interface Props {
  onSelect: (text: string) => void
  disabled: boolean
}

const chips = [
  'パスワードをリセットしたい',
  'VPN に接続できない',
  '有給を申請したい',
  '経費精算の方法は？',
]

export function SuggestionChips({ onSelect, disabled }: Props) {
  return (
    <div className="chips">
      {chips.map((chip) => (
        <button
          key={chip}
          className="chip"
          disabled={disabled}
          onClick={() => onSelect(chip)}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
