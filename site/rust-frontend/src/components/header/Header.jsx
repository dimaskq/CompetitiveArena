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

  // Fetch user data with token
  useEffect(() => {
    const token = localStorage.getItem("token"); // Отримуємо токен з localStorage

    if (token) {
      axios
        .get("https://rust-bedl.onrender.com/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Додаємо токен у заголовок
          },
        })
        .then((response) => {
          console.log("User data:", response.data);
          dispatch(setUser(response.data)); // Зберігаємо дані користувача
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          dispatch(clearUser());
        });
    } else {
      dispatch(clearUser()); // Якщо токен відсутній, очищаємо дані користувача
    }
  }, [dispatch]);

  const handleLogin = () => {
    // Перенаправляємо користувача на бекенд для аутентифікації
    window.location.href = "https://rust-bedl.onrender.com/auth/steam";
  };

  const handleLogout = () => {
    // Очищаємо токен і скидаємо дані користувача
    localStorage.removeItem("token");
    dispatch(clearUser());
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
                  {/* Перевіряємо наявність avatar */}
                  <img
                    src={user.avatar || "default-avatar.jpg"} // Показуємо аватар користувача
                    alt="Avatar"
                    className="avatar"
                  />
                  <span className="username">{user.displayName}</span>
                </div>
                <button
                  className="header__person header__person_logOut"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="header__person header__person_logIn"
                onClick={handleLogin}
              >
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
