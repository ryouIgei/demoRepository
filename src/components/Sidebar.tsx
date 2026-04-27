import { Category } from '../utils/botResponses'

interface SidebarProps {
  activeCategory: Category
  onSelect: (category: Category) => void
}

const categories: { id: Category; icon: string }[] = [
  { id: 'IT', icon: '💻' },
  { id: 'アカウント', icon: '👤' },
  { id: 'リモート', icon: '🏠' },
  { id: '休暇', icon: '🌴' },
  { id: '給与', icon: '💴' },
  { id: '経費', icon: '🧾' },
]

export default function Sidebar({ activeCategory, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">🤖</div>
        <div>
          <div className="sidebar-title">社内サポート AI</div>
          <div className="sidebar-subtitle">カテゴリを選択してください</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {categories.map(({ id, icon }) => (
          <button
            key={id}
            className={`sidebar-item${activeCategory === id ? ' active' : ''}`}
            onClick={() => onSelect(id)}
          >
            <span className="sidebar-icon">{icon}</span>
            <span>{id}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span>社内ヘルプデスク 内線: 1234</span>
      </div>
    </aside>
  )
}
