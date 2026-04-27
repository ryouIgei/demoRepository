import type { Category, CategoryId } from '../types'

const CATEGORIES: Category[] = [
  { id: 'it', label: 'IT', icon: '💻' },
  { id: 'account', label: 'アカウント', icon: '👤' },
  { id: 'remote', label: 'リモート', icon: '🏠' },
  { id: 'leave', label: '休暇', icon: '📅' },
  { id: 'salary', label: '給与', icon: '💴' },
  { id: 'expense', label: '経費', icon: '🧾' },
]

interface SidebarProps {
  activeCategory: CategoryId
  onSelectCategory: (id: CategoryId) => void
}

export default function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <span style={styles.logo}>🤖</span>
        <span style={styles.title}>社内サポート</span>
      </div>
      <nav>
        <p style={styles.sectionLabel}>カテゴリ</p>
        <ul style={styles.list}>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                style={{
                  ...styles.item,
                  ...(activeCategory === cat.id ? styles.itemActive : {}),
                }}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span style={styles.icon}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 220,
    minHeight: '100vh',
    background: '#ffffff',
    borderRight: '1px solid #e8eaf0',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 24px 0',
    flexShrink: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 20px 16px',
    borderBottom: '1px solid #e8eaf0',
    marginBottom: 8,
  },
  logo: { fontSize: 24 },
  title: { fontSize: 16, fontWeight: 700, color: '#1a1a2e' },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#9ea3b0',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '8px 20px 4px',
  },
  list: { listStyle: 'none', padding: '0 8px' },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 14,
    color: '#4a4a6a',
    fontWeight: 500,
    transition: 'background 0.15s',
    textAlign: 'left',
  },
  itemActive: {
    background: '#eef2ff',
    color: '#4f46e5',
    fontWeight: 600,
  },
  icon: { fontSize: 18, width: 24, textAlign: 'center' },
}
