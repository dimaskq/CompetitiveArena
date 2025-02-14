import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import logo from "../../../public/logo-removebg.png";
import axios from "axios";
import "./header-styles/Header.css";
import TabsSection from "./TabSections";
import Burger from "./Burger";
import Menu from "./Menu";

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  useOnClickOutside(node, () => setOpen(false));

  useEffect(() => {
    axios
      .get("https://rust-pkqo.onrender.com/api/user", {
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
        <nav className="header-menu">
          <ul className="menu__list">
            <TabsSection
              active={activeTab}
              onChange={(current) => setActiveTab(current)}
            />
            {user ? (
              <div
              className="user-info"
              tabIndex={0} 
              onBlur={() => setDropdownOpen(false)}
              >
                <div className="avatar-container" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img src={user.avatar} alt="Avatar" className="avatar" />
                  <div className="user-details">
                    <span className="username">{user.displayName}</span>
                    <span className="userid">ID: {user.steamId}</span>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                    <Link to="/api/user" className="dropdown-item" onClick={(event) => event.stopPropagation()}>
                      Profile
                    </Link>
                    <button className="dropdown-item logout-button" onClick={(event) => {event.stopPropagation(); handleLogout();}}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="header__person header__person_logIn"
                onClick={handleLogin}
              >
                LOG IN
              </button>
            )}
          </ul>
        </nav>
        <div className="burger-menu" ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;