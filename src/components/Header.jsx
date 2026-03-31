import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const menuItems = [
    { name: "天★Que広場", path: "/" },
    { name: "ニュース", path: "/news" },
    { name: "鑑賞記録", path: "/record" },
    { name: "作品", path: "/works" },
    { name: "通販ページ", path: "/shop" },
    { name: "天★Que新聞", path: "/newspaper" },
  ];

  return (
    <header className="header">
      <div className="logo">天★Que</div>

      {/* aboutボタン */}
      <div
        className="about-button"
        onClick={() => setAboutOpen(!aboutOpen)}
      >
        about
      </div>

      {/* PCメニュー */}
      <nav className="nav">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="nav-item">
            {item.name}
          </Link>
        ))}
      </nav>

      {/* ハンバーガー */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* スマホメニュー */}
      {isOpen && (
        <div className="menu">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="menu-item">
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* aboutメニュー */}
      {aboutOpen && (
        <div className="about-menu">
          <div className="about-item">天★Queとは</div>
          <div className="about-item">年表</div>
          <div className="about-item">Q&A</div>
          <div className="about-item">お問い合わせ</div>
          <div className="about-item">SNS</div>
        </div>
      )}
    </header>
  );
}

export default Header;
