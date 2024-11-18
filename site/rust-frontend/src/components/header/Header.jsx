import { useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../../public/long-logo.png";
import TabsSection from "./TabSections";
// import "./header-css/Header.scss";

const Header = () => {
  // Додаємо стейт для активної вкладки
  const [activeTab, setActiveTab] = useState("home");

  return (
    <header className="header">
      <div className="header-container">
        <Link className="header__logo" to="/">
          {/* <img src={logo} alt="Logo" /> */}
        </Link>
        <nav className="header-menu">
          <ul className="menu__list">
            <TabsSection
              active={activeTab} // Передаємо активну вкладку
              onChange={(current) => setActiveTab(current)} // Оновлюємо активну вкладку
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
