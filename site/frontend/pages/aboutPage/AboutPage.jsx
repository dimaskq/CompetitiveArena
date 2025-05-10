import { NavLink, Outlet } from "react-router-dom";
import "./aboutPage-styles/aboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <h1 className="about__title">About Page</h1>
      <div className="about-page__container">
        <aside className="about-page__menu">
          <ul className="about-page__menu_list">
            <NavLink
              to="arena"
              end
              className={({ isActive }) =>
                isActive
                  ? "about-page__menu_item active-link"
                  : "about-page__menu_item"
              }
            >
              <li>
                <span className="about-page__menu_link">About ARENA</span>
              </li>
            </NavLink>

            <NavLink
              to="team"
              className={({ isActive }) =>
                isActive
                  ? "about-page__menu_item active-link"
                  : "about-page__menu_item"
              }
            >
              <li>
                <span className="about-page__menu_link">Our Team</span>
              </li>
            </NavLink>

            <NavLink
              to="terms"
              className={({ isActive }) =>
                isActive
                  ? "about-page__menu_item active-link"
                  : "about-page__menu_item"
              }
            >
              <li>
                <span className="about-page__menu_link">
                  Terms & Conditions
                </span>
              </li>
            </NavLink>

            <NavLink
              to="help"
              className={({ isActive }) =>
                isActive
                  ? "about-page__menu_item active-link"
                  : "about-page__menu_item"
              }
            >
              <li>
                <span className="about-page__menu_link">Help*</span>
              </li>
            </NavLink>
          </ul>
        </aside>

        <main className="about-page__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AboutPage;
