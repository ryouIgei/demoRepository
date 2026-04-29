interface Props {
  onSelect: (text: string) => void
}

const categories = [
  { label: 'IT・システム', icon: '💻', query: 'パソコンが起動しない' },
  { label: 'アカウント', icon: '🔐', query: 'パスワードをリセットしたい' },
  { label: 'リモートワーク', icon: '🌐', query: 'VPN に接続できない' },
  { label: '休暇・勤怠', icon: '📅', query: '有給申請の方法を教えて' },
  { label: '給与・福利厚生', icon: '💴', query: '給与明細の確認方法' },
  { label: '経費精算', icon: '🧾', query: '経費精算の手順を教えて' },
]

export function Sidebar({ onSelect }: Props) {
  return (
    <aside className="sidebar">
      <p className="sidebar-heading">カテゴリ</p>
      <ul className="sidebar-list">
        {categories.map((cat) => (
          <li key={cat.label}>
            <button className="sidebar-item" onClick={() => onSelect(cat.query)}>
              <span className="sidebar-icon">{cat.icon}</span>
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
