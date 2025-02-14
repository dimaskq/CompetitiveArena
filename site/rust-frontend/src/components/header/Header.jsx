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
        <Link className="header__logo" to="/">
          <img src={logo} alt="logo" />
        </Link>

        {/* Информация о пользователе всегда в хедере */}
        {user && (
          <div className="user-info">
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

        {/* Бургер-меню для мобильных устройств */}
        {isMobile ? (
          <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        ) : (
          <nav className="header-menu">
            <ul className="menu__list">
              <TabsSection active={activeTab} onChange={setActiveTab} />
            </ul>
          </nav>
        )}

        {/* Всплывающее мобильное меню (только TabsSection) */}
        {menuOpen && (
          <div className="mobile-menu">
            <TabsSection active={activeTab} onChange={setActiveTab} />
          </div>
        )}

        {/* Кнопка логина (если пользователь не залогинен) */}
        {!user && (
          <button className="header__person header__person_logIn" onClick={handleLogin}>
            LOG IN
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
