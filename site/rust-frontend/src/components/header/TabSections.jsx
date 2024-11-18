import Button from "../button/Button";
import { Link } from "react-router-dom";
// import "./header-css/Header.scss";

export default function TabsSection({ active, onChange }) {
  return (
    <section className="tabSection">
      <Link to="/app">
        <Button isActive={active === "home"} onClick={() => onChange("home")}>
          Home
        </Button>
      </Link>
      <Link to="/app/contact">
        <Button isActive={active === "contact"} onClick={() => onChange("contact")}>
          About
        </Button>
      </Link>
    </section>
  );
}
