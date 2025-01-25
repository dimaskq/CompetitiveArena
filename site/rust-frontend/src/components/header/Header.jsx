import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import logo from "../../../public/logo-removebg.png";
import axios from "axios";
import "./header-styles/Header.css";
import TabsSection from "./TabSections";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("home");

  // fetch
  useEffect(() => {
    axios
      .get("https://rust-zowp.onrender.com/api/user", { withCredentials: true })
      .then((response) => {
        console.log('User data:', response.data); // Логируем успешный ответ
        dispatch(setUser(response.data)); // Сохраняем в Redux
      })
      .catch((error) => {
        console.error('Error fetching user:', error); // Логируем ошибку
        dispatch(clearUser()); // Сбрасываем состояние
      });
  }, [dispatch]);
  

  const handleLogin = () => {
    window.location.href = "https://rust-zowp.onrender.com/auth/steam";
  };

  const handleLogout = () => {
    axios
      .get("https://rust-zowp.onrender.com/logout", { withCredentials: true })
      .then(() => {
        dispatch(clearUser()); 
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
        <nav className="header-menu">
          <ul className="menu__list">
            <TabsSection
              active={activeTab}
              onChange={(current) => setActiveTab(current)}
            />
                {user ? (
      <div className="user-info">
        <div className="avatar-container">
          {/* Проверяем наличие avatar */}
          <img
            src={user.avatar || "default-avatar.jpg"} // Показываем аватар пользователя
            alt="Avatar"
            className="avatar"
          />
          <span className="username">{user.displayName}</span>
        </div>
        <button className="header__person header__person_logOut" onClick={handleLogout}>
          Logout
        </button>
      </div>
    ) : (
      <button className="header__person header__person_logIn" onClick={handleLogin}>
        LOG IN WITH STEAM
      </button>
    )}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
