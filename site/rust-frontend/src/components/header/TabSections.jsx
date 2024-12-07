import Button from "../button/Button";
import { Link } from "react-router-dom";
import "./header-styles/Header.css"

export default function TabsSection({ active, onChange }) {
  return (
    <section className="tabSection">
      <Link to="/app">
        <div className="button-container">
          <Button isActive={active === "home"} onClick={() => onChange("home")} className="nav-item">
              Home
          </Button>
        </div> 
      </Link>
      <Link to="/app/contact">
        <div className="button-container">
          <Button isActive={active === "contact"} onClick={() => onChange("contact")}>
            About
          </Button>
        </div>
      </Link>
      <Link to="/app/servers">
        <div className="button-container">
          <Button isActive={active === "servers"} onClick={() => onChange("servers")}>
            Servers
          </Button>
        </div>
      </Link>
    </section>
  );
}
