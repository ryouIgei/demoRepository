type Props = {
  input: string
  typing: boolean
  onChange: (v: string) => void
  onSend: (v: string) => void
}

export function ChatInput({ input, typing, onChange, onSend }: Props) {
  return (
    <form
      className="input-bar"
      onSubmit={e => { e.preventDefault(); onSend(input) }}
    >
      <input
        value={input}
        onChange={e => onChange(e.target.value)}
        placeholder="メッセージを入力..."
        disabled={typing}
      />
      <button type="submit" disabled={typing || !input.trim()}>送信</button>
    </form>
  )
}
