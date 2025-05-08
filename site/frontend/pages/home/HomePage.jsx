import React, { Suspense, lazy } from "react";
import "../../base-styles/reset.css";
import { loadFull } from "tsparticles";
import SloganBlock from "./SloganBlock";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./home-styles/HomePage.css";
const AboutBlockHome = lazy(() => import("./AboutBlockHome"));
import SloganBlock from "./SloganBlock";

function HomePage() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="home">
      <SloganBlock />
      <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
        <AboutBlockHome />
      </Suspense>

      <section className="beta-tester-section">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#1e1e2f",
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: ["#ff6f61", "#6b7280", "#ffffff"],
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.5,
                random: true,
              },
              size: {
                value: 3,
                random: true,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
                push: {
                  quantity: 4,
                },
              },
            },
            detectRetina: true,
          }}
        />
        <div className="beta-tester-content">
          <h2>Присоединяйся к бета-тестированию!</h2>
          <p>Стань частью нашего сообщества и помоги сделать проект лучше.</p>
          <Link to="/beta-tester">
            <button className="beta-tester-button">Стать бета-тестером</button>
          </Link>
        </div>
      </section>

      {/* <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
        <ServersPage />
      </Suspense> */}
    </div>
  );
}

export default HomePage;
