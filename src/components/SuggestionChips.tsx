interface Props {
  onSelect: (text: string) => void;
  disabled: boolean;
}

const chips = [
  'パスワードをリセットしたい',
  'VPNに接続できない',
  '有給申請の方法は？',
  '経費精算の手順を教えて',
];

export function SuggestionChips({ onSelect, disabled }: Props) {
  return (
    <div className="chips">
      {chips.map(c => (
        <button
          key={c}
          className="chip"
          onClick={() => onSelect(c)}
          disabled={disabled}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
