import type { Category } from '../bot/responses'
import { categories, categoryIcons } from '../bot/responses'
import styles from './Sidebar.module.css'

interface Props {
  active: Category
  onSelect: (c: Category) => void
}

export default function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🤖</span>
        <span className={styles.logoText}>社内サポートAI</span>
      </div>
      <nav className={styles.nav}>
        <p className={styles.navLabel}>カテゴリ</p>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.navItem} ${active === cat ? styles.active : ''}`}
            onClick={() => onSelect(cat)}
          >
            <span className={styles.icon}>{categoryIcons[cat]}</span>
            <span>{cat}</span>
          </button>
        ))}
      </nav>
      <div className={styles.footer}>
        <span>v1.0.0</span>
      </div>
    </aside>
  )
}
