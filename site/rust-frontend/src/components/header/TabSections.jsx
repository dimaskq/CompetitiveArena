import Button from "../button/Button";
import { Link } from "react-router-dom";
import "./header-styles/Header.css"

export default function TabsSection({ active, onChange }) {
  return (
    <section className="tabSection">
      <Link to="/">
        <div className="button-container">
          <Button isActive={active === "home"} onClick={() => onChange("home")} className="nav-item">
              Home
          </Button>
        </div> 
      </Link>
      <Link to="/contact">
        <div className="button-container">
          <Button isActive={active === "contact"} onClick={() => onChange("contact")}>
            About
          </Button>
        </div>
      </Link>
      <Link to="/servers">
        <div className="button-container">
          <Button isActive={active === "servers"} onClick={() => onChange("servers")}>
            Servers
          </Button>
        </div>
      </Link>
      <Link to="/rules">
        <div className="button-container">
          <Button isActive={active === "rules"} onClick={() => onChange("rules")}>
            Rules
          </Button>
        </div>
      </Link>
      <Link to="/leaderboard">
        <div className="button-container">
          <Button isActive={active === "leaderboard"} onClick={() => onChange("leaderboard")}>
            Leaderboard
          </Button>
        </div>
      </Link>
    </section>
  );
}
