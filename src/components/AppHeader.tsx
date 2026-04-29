export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__icon">💬</div>
      <div>
        <h1 className="app-header__title">社内サポートチャット</h1>
        <p className="app-header__subtitle">社内の各種手続きをサポートします</p>
      </div>
      <span className="app-header__status">● オンライン</span>
    </header>
  );
}
