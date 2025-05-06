import React, { Suspense, lazy } from "react";
import "../../base-styles/reset.css";

const AboutBlockHome = lazy(() => import("./AboutBlockHome"));
const ServersPage = lazy(() => import("../servers/Servers"));
import SloganBlock from "./SloganBlock";

function HomePage() {
  return (
    <div className="home">
      <SloganBlock />

      <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
        <AboutBlockHome />
      </Suspense>

      <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
        <ServersPage />
      </Suspense>
    </div>
  );
}

export default HomePage;
