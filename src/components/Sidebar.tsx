import type { Category } from '../types';
import styles from './Sidebar.module.css';

const CATEGORIES: Category[] = ['IT', 'アカウント', 'リモート', '休暇', '給与', '経費'];

const CATEGORY_ICONS: Record<Category, string> = {
  IT: '💻',
  アカウント: '👤',
  リモート: '🏠',
  休暇: '🌴',
  給与: '💴',
  経費: '🧾',
};

interface SidebarProps {
  activeCategory: Category | null;
  onSelect: (category: Category) => void;
}

export function Sidebar({ activeCategory, onSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🤖</span>
        <span className={styles.logoText}>社内サポート</span>
      </div>
      <nav>
        <p className={styles.sectionLabel}>カテゴリ</p>
        <ul className={styles.categoryList}>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                className={`${styles.categoryItem} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => onSelect(cat)}
              >
                <span className={styles.icon}>{CATEGORY_ICONS[cat]}</span>
                <span>{cat}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
