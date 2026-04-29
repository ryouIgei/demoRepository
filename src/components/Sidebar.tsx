interface SidebarProps {
  onSelect: (text: string) => void;
}

const categories = [
  { label: 'IT・アカウント', query: 'パスワードをリセットしたい' },
  { label: 'リモートワーク', query: 'VPNに接続できない' },
  { label: 'IT機器サポート', query: 'パソコンが起動しない' },
  { label: '休暇・勤怠', query: '有給休暇を申請したい' },
  { label: '給与・福利厚生', query: '給与明細を確認したい' },
  { label: '経費精算', query: '経費を精算したい' },
];

export function Sidebar({ onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <p className="sidebar__heading">カテゴリ</p>
      <ul className="sidebar__list">
        {categories.map((c) => (
          <li key={c.label}>
            <button className="sidebar__btn" onClick={() => onSelect(c.query)}>
              {c.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
