import { Category } from '../data/botResponses'

interface SidebarProps {
  selected: Category
  onSelect: (cat: Category) => void
}

const categories: { label: Category; icon: string }[] = [
  { label: 'IT', icon: '💻' },
  { label: 'アカウント', icon: '🔑' },
  { label: 'リモート', icon: '🏠' },
  { label: '休暇', icon: '🌴' },
  { label: '給与', icon: '💴' },
  { label: '経費', icon: '🧾' },
]

export default function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🤖</span>
        <span style={styles.logoText}>社内サポートAI</span>
      </div>
      <nav style={styles.nav}>
        <p style={styles.navLabel}>カテゴリ</p>
        {categories.map(({ label, icon }) => (
          <button
            key={label}
            style={{
              ...styles.navItem,
              ...(selected === label ? styles.navItemActive : {}),
            }}
            onClick={() => onSelect(label)}
          >
            <span style={styles.navIcon}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div style={styles.footer}>
        <p style={styles.footerText}>お困りの場合は</p>
        <p style={styles.footerContact}>📞 内線: 1234</p>
        <p style={styles.footerContact}>✉ helpdesk@example.com</p>
      </div>
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 220,
    minWidth: 220,
    background: '#ffffff',
    borderRight: '1px solid #e8eaf0',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 16px 18px',
    borderBottom: '1px solid #e8eaf0',
  },
  logoIcon: { fontSize: 24 },
  logoText: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1a1a2e',
    letterSpacing: '-0.3px',
  },
  nav: { flex: 1, padding: '16px 8px', overflowY: 'auto' },
  navLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#9ca3af',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0 8px',
    marginBottom: 8,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'left',
    transition: 'all 0.15s',
    marginBottom: 2,
  },
  navItemActive: {
    background: '#eef2ff',
    color: '#4f46e5',
    fontWeight: 600,
  },
  navIcon: { fontSize: 18 },
  footer: {
    padding: '16px',
    borderTop: '1px solid #e8eaf0',
  },
  footerText: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 6,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  footerContact: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 3,
  },
}
