import type { Category } from '../types'

const CATEGORIES: Category[] = ['IT', 'アカウント', 'リモート', '休暇', '給与', '経費']

const ICONS: Record<Category, string> = {
  IT: '💻',
  アカウント: '👤',
  リモート: '🏠',
  休暇: '🌴',
  給与: '💴',
  経費: '🧾',
}

interface Props {
  selected: Category
  onSelect: (cat: Category) => void
}

export default function Sidebar({ selected, onSelect }: Props) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🤖</span>
        <span style={styles.logoText}>社内サポート</span>
      </div>
      <nav>
        <p style={styles.sectionLabel}>カテゴリ</p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              ...styles.catButton,
              ...(selected === cat ? styles.catButtonActive : {}),
            }}
          >
            <span style={styles.icon}>{ICONS[cat]}</span>
            {cat}
          </button>
        ))}
      </nav>
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 220,
    minHeight: '100vh',
    background: '#fff',
    borderRight: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 24px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '24px 20px 20px',
    borderBottom: '1px solid #f0f0f0',
  },
  logoIcon: { fontSize: 24 },
  logoText: { fontWeight: 700, fontSize: 15, color: '#1a1a2e' },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    padding: '20px 20px 8px',
  },
  catButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '10px 20px',
    background: 'none',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    transition: 'background 0.15s',
  },
  catButtonActive: {
    background: '#f0f4ff',
    color: '#3b5bdb',
    fontWeight: 600,
    borderLeft: '3px solid #3b5bdb',
  },
  icon: { fontSize: 18 },
}
