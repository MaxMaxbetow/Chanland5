import "./header.css";

export default function Header() {
  return (
    <header className="header-wrapper">
      <nav className="navbar">

        <div className="nav-sweep"></div>

        <a className="logo" href="/">
          <img src="/logo.png" alt="ChanLand" />
          <span>ChanLand</span>
        </a>

        <div className="divider"></div>

        <a className="nav-link" href="/rules">Правила</a>
        <a className="nav-link" href="/server">О сервере</a>
        <a className="nav-link" href="/territories">Территории</a>
        <a className="nav-link" href="/info">Доп. инфо</a>

        <div className="divider"></div>

        <a className="discord-btn" href="https://discord.gg/yourserver">
          Discord
        </a>

      </nav>
    </header>
  );
}
