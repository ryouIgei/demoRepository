interface Props {
  onSelect: (text: string) => void;
}

const categories = [
  { label: 'IT・機器サポート', icon: '💻', query: 'パソコンが起動しない' },
  { label: 'アカウント・ログイン', icon: '🔑', query: 'パスワードをリセットしたい' },
  { label: 'リモートワーク', icon: '🌐', query: 'VPNに接続できない' },
  { label: '休暇・勤怠', icon: '📅', query: '有給申請の方法を教えてください' },
  { label: '給与・福利厚生', icon: '💴', query: '給与明細の確認方法は？' },
  { label: '経費精算', icon: '🧾', query: '経費精算の手順を教えてください' },
];

export function Sidebar({ onSelect }: Props) {
  return (
    <aside className="sidebar">
      <p className="sidebar__heading">カテゴリ</p>
      <ul className="sidebar__list">
        {categories.map(c => (
          <li key={c.label}>
            <button className="sidebar__btn" onClick={() => onSelect(c.query)}>
              <span className="sidebar__icon">{c.icon}</span>
              {c.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
