import "../../base-styles/reset.css";
import ServersPage from "../servers/Servers";
import AboutBlockHome from "./AboutBlockHome";
import SloganBlock from "./SloganBlock";

function HomePage() {
  return (
    <div className="home">
      <SloganBlock />
      <AboutBlockHome />
      <ServersPage />
    </div>
  );
}

export default HomePage;
