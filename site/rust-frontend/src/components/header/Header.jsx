import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/white_logo.png";
import TabsSection from "./TabSections";
import "./header-styles/Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 121) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main header */}
      <header className="header">
        <div className="header-container">
          <Link className="header__logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <nav className="header-menu">
            <ul className="menu__list">
              <TabsSection
                active={activeTab}
                onChange={(current) => setActiveTab(current)}
              />
            </ul>
          </nav>
        </div>
      </header>

      {/* Second header that appears after scroll */}
      <header className={`second-header ${isScrolled ? "second-header--visible" : ""}`}>
        <div className="header-container">
          <Link className="header__logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <nav className="header-menu">
            <ul className="menu__list">
              <TabsSection
                active={activeTab}
                onChange={(current) => setActiveTab(current)}
              />
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
