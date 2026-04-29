interface SidebarProps {
  onSelect: (text: string) => void;
}

const CATEGORIES = [
  { icon: '💻', label: 'IT・パソコン', query: 'PCが起動しない' },
  { icon: '🔑', label: 'アカウント', query: 'パスワードをリセットしたい' },
  { icon: '🌐', label: 'リモートワーク', query: 'VPNに接続できない' },
  { icon: '📅', label: '休暇・勤怠', query: '有給を申請したい' },
  { icon: '💴', label: '給与・福利厚生', query: '給与明細を確認したい' },
  { icon: '🧾', label: '経費精算', query: '経費を精算したい' },
];

export function Sidebar({ onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <p className="sidebar-title">カテゴリから選ぶ</p>
      <ul className="sidebar-list">
        {CATEGORIES.map((cat) => (
          <li key={cat.label}>
            <button className="sidebar-item" onClick={() => onSelect(cat.query)}>
              <span className="sidebar-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
