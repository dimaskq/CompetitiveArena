import Button from "../button/Button";
import { Link } from "react-router-dom";
import "./header-styles/Header.css";
import { useEffect, useState } from "react";

function useIsMobile(maxWidth = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isMobile;
}

export default function TabsSection({ active, onChange }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const isMobile = useIsMobile();

  const tabs = [
    { to: "/", label: "Home", value: "home" },
    { label: "About", value: "about", to: "/about" },
    { to: "/rules", label: "Rules", value: "rules" },
  ];

  const aboutSubLinks = [
    { to: "/about/arena", label: "About ARENA" },
    { to: "/about/team", label: "Our Team" },
    { to: "/about/terms", label: "Terms & Conditions" },
    { to: "/about/help", label: "Help*" },
  ];

  return (
    <section className="tabSection">
      {tabs.map(({ to, label, value }) => {
        if (label === "About" && isMobile) {
          return (
            <div key={value} className="button-container">
              <Button
                isActive={active === value}
                onClick={() => setAboutOpen((prev) => !prev)}
                className="header-btn"
              >
                {label}
              </Button>
              {aboutOpen && (
                <div className="submenu">
                  {aboutSubLinks.map((sub) => (
                    <Link
                      to={sub.to}
                      key={sub.to}
                      onClick={() => onChange("about")}
                    >
                      <div className="submenu__item">{sub.label}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
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
        );
      })}
    </section>
  );
}
