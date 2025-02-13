const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
                tabIndex={0} // Позволяет отслеживать потерю фокуса
                onBlur={() => setDropdownOpen(false)} // Закрывает меню, когда фокус теряется
              >
                <div
                  className="avatar-container"
                  onClick={() => setDropdownOpen((prev) => !prev)}
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
                      to="/profile"
                      className="dropdown-item"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Профиль
                    </Link>
                    <button
                      className="dropdown-item logout-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLogout();
                      }}
                    >
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
                LOG IN WITH STEAM
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
