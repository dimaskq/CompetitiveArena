import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import "../../base-styles/reset.css";
import "./home-styles/HomePage.css";
import { Helmet } from "react-helmet-async";

const AboutBlockHome = lazy(() => import("./AboutBlockHome"));
import SloganBlock from "./SloganBlock";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Competitive Arena – Only Skill Matters</title>
        <meta
          name="description"
          content="A platform for competitions in Rust, CS2 and others. Feel the real competitive spirit!"
        />
        <meta
          property="og:title"
          content="Competitive Arena – Only Skill Matters"
        />
        <meta
          property="og:description"
          content="Your platform for competitions. Beta is now open - join!"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="home">
        <SloganBlock />
        <section className="beta-tester-section">
          <div className="beta-tester-content">
            <h2 className="beta-tester__title">Join the beta testing!</h2>
            <p>
              Become part of our community and help make the project better.
            </p>
            <Link to="/beta-tester" className="beta-tester-button__container">
              <button className="beta-tester-button">
                Become a beta tester
              </button>
            </Link>
          </div>
        </section>
        <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
          <AboutBlockHome />
        </Suspense>
      </div>
    </>
  );
}

export default HomePage;
