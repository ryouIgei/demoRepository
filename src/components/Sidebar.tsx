import { categories, type Category } from '../data/responses'
import styles from './Sidebar.module.css'

interface SidebarProps {
  activeCategory: Category
  onSelect: (cat: Category) => void
}

export function Sidebar({ activeCategory, onSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>🤖</div>
        <div>
          <div className={styles.title}>社内サポート AI</div>
          <div className={styles.subtitle}>Internal Help Desk</div>
        </div>
      </div>
      <nav className={styles.nav}>
        <div className={styles.navLabel}>カテゴリ</div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.navItem} ${activeCategory === cat.id ? styles.active : ''}`}
            style={activeCategory === cat.id ? { borderLeftColor: cat.color, color: cat.color, background: `${cat.color}10` } : {}}
            onClick={() => onSelect(cat.id)}
          >
            <span className={styles.navIcon}>{cat.icon}</span>
            <span>{cat.id}</span>
          </button>
        ))}
      </nav>
      <div className={styles.footer}>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          オンライン
        </div>
      </div>
    </aside>
  )
}
