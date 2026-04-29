interface SuggestionChipsProps {
  onSelect: (text: string) => void;
}

const CHIPS = [
  'パスワードをリセットしたい',
  'VPNに接続できない',
  '有給を申請したい',
  '経費を精算したい',
];

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="chips">
      {CHIPS.map((chip) => (
        <button key={chip} className="chip" onClick={() => onSelect(chip)}>
          {chip}
        </button>
      ))}
    </div>
  );
}
