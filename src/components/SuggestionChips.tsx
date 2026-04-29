interface SuggestionChipsProps {
  onSelect: (text: string) => void;
  disabled: boolean;
}

const suggestions = [
  'パスワードをリセットしたい',
  'VPNの接続方法を教えて',
  '有給休暇を申請したい',
  '経費精算の手順を教えて',
];

export function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="chips">
      {suggestions.map((s) => (
        <button
          key={s}
          className="chip"
          onClick={() => onSelect(s)}
          disabled={disabled}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
