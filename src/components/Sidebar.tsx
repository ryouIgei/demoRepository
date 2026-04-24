type Category = { icon: string; label: string; desc: string; query: string }

const CATEGORIES: Category[] = [
  { icon: '💻', label: 'IT サポート',   desc: 'PC・ネットワーク・VPN',  query: 'パソコンが起動しない' },
  { icon: '🔑', label: 'アカウント',    desc: 'パスワード・ログイン',     query: 'パスワードをリセットしたい' },
  { icon: '🌐', label: 'リモートワーク', desc: 'VPN・テレワーク',         query: 'VPN に接続できない' },
  { icon: '🏖️', label: '休暇・勤怠',   desc: '有給・申請',              query: '有給休暇を申請したい' },
  { icon: '💰', label: '給与・福利厚生', desc: '給与明細・賞与',           query: '給与明細を確認したい' },
  { icon: '🧾', label: '経費精算',      desc: '交通費・出張・領収書',      query: '経費精算の方法を知りたい' },
]

type Props = { onSelect: (query: string) => void }

export function Sidebar({ onSelect }: Props) {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">よくあるご質問</p>
      <ul className="category-list">
        {CATEGORIES.map(c => (
          <li key={c.label}>
            <button className="category-item" onClick={() => onSelect(c.query)}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-body">
                <span className="cat-label">{c.label}</span>
                <span className="cat-desc">{c.desc}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
