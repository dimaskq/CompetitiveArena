import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://rust-bedl.onrender.com/api/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log('User not authenticated or error fetching user data');
      });
  }, []);

  return (
    <header className="header">
      <div className="header-container container">
        <nav className="header-menu">
          <ul className="menu__list">
            {user ? (
              <div className="user-info">
                <div className="avatar-container">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="avatar"
                  />
                  <span className="username">{user.displayName}</span>
                </div>
                <button className="header__person header__person_logOut">
                  Logout
                </button>
              </div>
            ) : (
              <button className="header__person header__person_logIn">
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
