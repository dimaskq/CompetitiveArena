import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import logo from "../../../public/logo-removebg.png";
import axios from "axios";
import "./header-styles/Header.css";
import TabsSection from "./TabSections";
import { FiMenu, FiX } from "react-icons/fi"; // Иконки для бургер-меню

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 885);

  useEffect(() => {
    axios
      .get("https://rust-pkqo.onrender.com/api/user", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          dispatch(setUser(response.data));
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 885);
      if (window.innerWidth > 885) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    window.location.href = "https://rust-pkqo.onrender.com/auth/steam";
  };

  const handleLogout = () => {
    axios
      .get("https://rust-pkqo.onrender.com/logout", { withCredentials: true })
      .then(() => {
        dispatch(clearUser());
        window.location.href = "https://rust-pkqo.onrender.com";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <header className="header">
      <div className="header-container container">
        {/* Бургер-меню слева в мобильной версии */}
        {isMobile && (
          <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        )}

        {/* Логотип по центру только в мобильной версии */}
        <Link className={`header__logo ${isMobile ? "center-logo" : ""}`} to="/">
          <img src={logo} alt="logo" />
        </Link>

        {/* Информация о пользователе: слева на десктопе, справа на мобильном */}
        {user && (
          <div className={`user-info ${isMobile ? "mobile-user" : ""}`}>
            <div className="avatar-container">
              <img src={user.avatar} alt="Avatar" className="avatar" />
              <div className="user-details">
                <span className="username">{user.displayName}</span>
                <span className="userid">ID: {user.steamId}</span>
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {/* Навигация в десктопной версии */}
        {!isMobile && (
          <nav className="header-menu">
            <ul className="menu__list">
              <TabsSection active={activeTab} onChange={setActiveTab} />
            </ul>
          </nav>
        )}
      </div>

      {/* Бургер-меню выплывает справа налево */}
      {menuOpen && (
        <div className="mobile-menu slide-in">
          <TabsSection active={activeTab} onChange={setActiveTab} />
        </div>
      )}

      {/* Кнопка логина (если пользователь не залогинен) */}
      {!user && (
        <button className="header__person header__person_logIn" onClick={handleLogin}>
          LOG IN
        </button>
      )}
    </header>
  );
};

export default Header;
