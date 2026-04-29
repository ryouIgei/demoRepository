interface ChatInputProps {
  input: string;
  setInput: (v: string) => void;
  send: () => void;
  typing: boolean;
}

export function ChatInput({ input, setInput, send, typing }: ChatInputProps) {
  return (
    <div className="chat-input">
      <input
        className="chat-input__field"
        type="text"
        placeholder="メッセージを入力..."
        value={input}
        disabled={typing}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
      />
      <button
        className="chat-input__btn"
        onClick={() => send()}
        disabled={typing || !input.trim()}
      >
        送信
      </button>
    </div>
  );
}
