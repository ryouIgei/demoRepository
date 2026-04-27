import { useMemo, useState, type FormEvent } from 'react'
import './App.css'

type Role = 'user' | 'bot'

type Message = {
  id: number
  role: Role
  text: string
  time: string
}

const CATEGORIES = ['IT', 'アカウント', 'リモート', '休暇', '給与', '経費']

const SUGGESTIONS = [
  'VPNに接続できない',
  'パスワードをリセットしたい',
  '有給休暇の申請方法を知りたい',
  '経費精算の締め日を教えて',
]

const BOT_GREETING =
  'こんにちは。社内サポートAIです。IT・アカウント・リモート勤務・休暇・給与・経費の質問にお答えします。'

function nowTime() {
  return new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
}

function getBotReply(input: string) {
  const text = input.toLowerCase()

  if (/(vpn|接続|ネットワーク|wi-?fi)/.test(text)) {
    return 'VPN接続の一次切り分けです。1) クライアント再起動 2) 社員ID再認証 3) 会社ポータルの障害情報確認 をお試しください。'
  }
  if (/(パスワード|password|ログイン|アカウント|id)/.test(text)) {
    return 'アカウント関連の手続きです。社内ポータルの「ID管理」からパスワード再設定が可能です。ロック時はITヘルプデスクへ連絡してください。'
  }
  if (/(在宅|リモート|テレワーク|出社)/.test(text)) {
    return 'リモート勤務ルールです。勤務開始時に勤怠打刻、VPN接続、業務終了時に日報登録をお願いします。'
  }
  if (/(休暇|有給|欠勤|早退)/.test(text)) {
    return '休暇申請は人事システムの「休暇申請」メニューから行えます。原則として前営業日までの申請をお願いします。'
  }
  if (/(給与|給料|明細|振込)/.test(text)) {
    return '給与明細は毎月25日に人事ポータルへ公開されます。未反映の場合は人事部へチケット起票してください。'
  }
  if (/(経費|精算|交通費|領収書)/.test(text)) {
    return '経費精算は月末締め・翌月5日提出です。領収書画像を添付し、承認ルートを選択して申請してください。'
  }

  return '内容を確認しました。関連部署へつなぐため、もう少し具体的に状況を教えてください。'
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'bot', text: BOT_GREETING, time: nowTime() },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const activeCategory = useMemo(() => {
    const latestUser = [...messages].reverse().find(message => message.role === 'user')
    if (!latestUser) return '全カテゴリ'

    const text = latestUser.text.toLowerCase()
    if (/(vpn|接続|ネットワーク|wi-?fi|it)/.test(text)) return 'IT'
    if (/(パスワード|ログイン|アカウント|id)/.test(text)) return 'アカウント'
    if (/(在宅|リモート|テレワーク|出社)/.test(text)) return 'リモート'
    if (/(休暇|有給|欠勤|早退)/.test(text)) return '休暇'
    if (/(給与|給料|明細|振込)/.test(text)) return '給与'
    if (/(経費|精算|交通費|領収書)/.test(text)) return '経費'
    return '全カテゴリ'
  }, [messages])

  function pushUserMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: nowTime(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: getBotReply(trimmed),
        time: nowTime(),
      }
      setMessages(prev => [...prev, botMessage])
      setTyping(false)
    }, 900)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    pushUserMessage(input)
  }

  return (
    <div className="layout">
      <aside className="sidebar" aria-label="カテゴリ一覧">
        <h1>社内サポート</h1>
        <p className="sidebar-subtitle">カテゴリ</p>
        <ul>
          {CATEGORIES.map(category => (
            <li key={category} className={activeCategory === category ? 'active' : ''}>
              {category}
            </li>
          ))}
        </ul>
      </aside>

      <main className="chat-panel">
        <header className="chat-header">
          <h2>AIチャットサポート</h2>
          <span>ライトモード</span>
        </header>

        <section className="messages" aria-label="チャット履歴">
          {messages.map(message => (
            <article
              key={message.id}
              className={`bubble-row ${message.role === 'user' ? 'right' : 'left'}`}
            >
              <div className={`bubble ${message.role}`}>{message.text}</div>
              <time>{message.time}</time>
            </article>
          ))}

          {typing && (
            <article className="bubble-row left">
              <div className="bubble bot typing" aria-label="入力中">
                <span />
                <span />
                <span />
              </div>
            </article>
          )}
        </section>

        <section className="chips" aria-label="サジェスト">
          {SUGGESTIONS.map(chip => (
            <button key={chip} type="button" onClick={() => pushUserMessage(chip)}>
              {chip}
            </button>
          ))}
        </section>

        <form className="composer" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder="質問を入力してください"
            aria-label="メッセージ入力"
          />
          <button type="submit">送信</button>
        </form>
      </main>
    </div>
  )
}

export default App
