import { Link, Outlet } from "react-router-dom";
import "./aboutPage-styles/aboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-page__container">
        <aside className="about-page__menu">
          <ul className="about-page__menu_list">
            <li>
              <Link to="arena" className="about-page__menu_link">
                About Competitive Arena
              </Link>
            </li>
            <li>
              <Link to="team" className="about-page__menu_link">
                Our Team
              </Link>
            </li>
            <li>
              <Link to="help" className="about-page__menu_link">
                Help
              </Link>
            </li>
            <li>
              <Link to="terms" className="about-page__menu_link">
                Terms & Conditions
              </Link>
            </li>
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
