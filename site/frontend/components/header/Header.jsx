import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-removebg.png";
import axios from "axios";
import "./header-styles/Header.css";
import TabsSection from "./TabSections";
import Burger from "./Burger";
import Menu from "./Menu";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
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
  const navigate = useNavigate();

  useOnClickOutside(node, () => setOpen(false));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    axios
      .get("https://competitivearena.up.railway.app/api/user", {
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

  const handleLogout = () => {
    console.log("Logging out...");
    axios
      .get("https://competitivearena.up.railway.app/logout", {
        withCredentials: true,
      })
      .then(() => {
        console.log("Logout successful");
        dispatch(clearUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <header className="header">
      <div className="header-container container">
        <Link className="header__logo" to="/">
          <img src={logo} alt="Company logo" />
        </Link>
        <nav className="header-menu">
          <ul className="menu__list">
            <TabsSection
              active={activeTab}
              onChange={(current) => setActiveTab(current)}
            />
          </ul>
          {user ? (
            <div
              className="user-info"
              tabIndex={0}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setDropdownOpen(false);
                }
              }}
            >
              <div
                className="avatar-container"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={user.avatar} alt="Avatar" className="avatar" />
                <div className="user-details">
                  <span className="username">{user.displayName}</span>
                  <span className="userid">ID: {user.steamId}</span>
                </div>
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/api/user"
                    className="dropdown-item"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Profile
                  </Link>
                  <a
                    className="dropdown-item logout-button"
                    href="https://competitivearena.up.railway.app/logout"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <button className="header__person header__person_logIn">
              <a href="https://competitivearena.up.railway.app/auth/steam">
                {" "}
                LOG IN
              </a>
            </button>
          )}
        </nav>
        <div className="burger-menu" ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu
            open={open}
            setOpen={setOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
