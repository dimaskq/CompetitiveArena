import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import "../../base-styles/reset.css";
import "./home-styles/HomePage.css";

const AboutBlockHome = lazy(() => import("./AboutBlockHome"));
import SloganBlock from "./SloganBlock";

function HomePage() {
  return (
    <div className="home">
      <SloganBlock />
      <section className="beta-tester-section">
        <div className="beta-tester-content">
          <h2 className="beta-tester__title">Join the beta testing!</h2>
          <p>Become part of our community and help make the project better.</p>
          <Link to="/beta-tester" className="beta-tester-button__container">
            <button className="beta-tester-button">Become a beta tester</button>
          </Link>
        </div>
      </section>
      <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
        <AboutBlockHome />
      </Suspense>
    </div>
  );
}

export default HomePage;
