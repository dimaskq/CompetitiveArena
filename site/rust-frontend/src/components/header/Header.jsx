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
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((response) => {
        dispatch(setUser(response.data)); // save data to Redux
      })
      .catch(() => {
        dispatch(clearUser()); // reset state
      });
  }, [dispatch]);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/steam";
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        dispatch(clearUser()); // delete data from redux
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
                  <img
                    src={user.photos[2].value}
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
