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

  useEffect(() => {
    axios
      .get("https://rust-bedl.onrender.com/api/user", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          dispatch(setUser(response.data));
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [dispatch]);

  const handleLogin = () => {
    window.location.href = "https://rust-bedl.onrender.com/auth/steam";
  };

  const handleLogout = () => {
    axios
      .get("https://rust-bedl.onrender.com/logout", { withCredentials: true }) 
      .then(() => {
        dispatch(clearUser());
        window.location.href = "/"; 
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
                  {/* Show user's avatar */}
                  <img
                    src={user.avatar || "default-avatar.jpg"}
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
