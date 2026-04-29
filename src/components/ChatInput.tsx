import { type KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: (text: string) => void;
  disabled: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
    <div className="chat-input">
      <input
        className="chat-input__field"
        type="text"
        placeholder="メッセージを入力..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
      />
      <button
        className="chat-input__btn"
        onClick={() => onSend(value)}
        disabled={disabled || !value.trim()}
      >
        送信
      </button>
    </div>
  );
}
