import Button from "../button/Button";
import { Link } from "react-router-dom";
import "./header-styles/Header.css";

export default function TabsSection({ active, onChange }) {
  const tabs = [
    { to: "/", label: "Home", value: "home" },
    { to: "/contact", label: "About", value: "contact" },
    { to: "/servers", label: "Servers", value: "servers" },
    { to: "/rules", label: "Rules", value: "rules" },
    { to: "/leaderboard", label: "Leaderboard", value: "leaderboard" },
  ];

  return (
    <section className="tabSection">
      {tabs.map(({ to, label, value }) => (
        <Link to={to} key={value}>
          <div className="button-container">
            <Button
              isActive={active === value}
              onClick={() => onChange(value)}
              className="header-btn"
            >
              {label}
            </Button>
          </div>
        </Link>
      ))}
    </section>
  );
}
