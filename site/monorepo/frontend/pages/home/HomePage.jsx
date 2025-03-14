import React, { Suspense, lazy } from "react";
import "../../base-styles/reset.css";

// Лейзі лоад для компонентів
const AboutBlockHome = lazy(() => import("./AboutBlockHome"));
const ServersPage = lazy(() => import("../servers/Servers"));
import SloganBlock from "./SloganBlock";

function HomePage() {
  return (
    <div className="home">
      <SloganBlock />

      {/* Лейзі лоад для AboutBlockHome та ServersPage */}
      <Suspense fallback={<div>Loading AboutBlockHome...</div>}>
        <AboutBlockHome />
      </Suspense>

      <Suspense fallback={<div>Loading ServersPage...</div>}>
        <ServersPage />
      </Suspense>
    </div>
  );
}

export default HomePage;
