import type { Category } from '../types';

const CATEGORIES: { id: Category; icon: string }[] = [
  { id: 'IT', icon: '💻' },
  { id: 'アカウント', icon: '👤' },
  { id: 'リモート', icon: '🏠' },
  { id: '休暇', icon: '🌴' },
  { id: '給与', icon: '💴' },
  { id: '経費', icon: '🧾' },
];

interface SidebarProps {
  selected: Category;
  onSelect: (cat: Category) => void;
}

export function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🤝</span>
        <span className="sidebar-title">社内サポート</span>
      </div>
      <nav className="sidebar-nav">
        {CATEGORIES.map(({ id, icon }) => (
          <button
            key={id}
            className={`sidebar-item${selected === id ? ' sidebar-item--active' : ''}`}
            onClick={() => onSelect(id)}
          >
            <span className="sidebar-icon">{icon}</span>
            <span className="sidebar-label">{id}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
