import "./aboutPage-styles/aboutPage.css";
import img1 from "../../assets/aboutList-img1.png";
import img2 from "../../assets/aboutList-img2.jpeg";
import Typewriter from "typewriter-effect";
import AboutDevelopers from "./AboutDevelopers";
import OfferSection from "./OfferSection";
import { useEffect, useState } from "react";

function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile based on screen width
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const typewriterText = isMobile ? (
    <span>Welcome to Competitive Arena!</span>
  ) : (
    <Typewriter
      options={{
        strings: ["Welcome to Competitive Arena!"],
        autoStart: true,
        loop: true,
        delay: 40,
        deleteSpeed: 10,
        pauseFor: 5000,
      }}
    />
  );

  return (
    <div className="about-page">
      <h1 className="about__title">About Us</h1>
      <div className="about__container">
        <div className="about__text_container">
          <p className="about_text_top">{typewriterText}</p>
          <p className="about__text_topPH">Welcome to Competitive Arena!</p>
          <OfferSection
            title="What We Offer:"
            items={[
              "Best Game Servers – just enjoy the game!",
              "Exciting Tournaments - Exciting tournaments for real champions.",
              "Fair Play - Fair play without cheaters and unfair advantages.",
              "Active Community - A friendly community of players ready to communicate and play together.",
              "Player Support - Fast and responsive support to resolve any issues.",
            ]}
            imgSrc={img1}
            imgAlt="image for first block of about"
            imgPosition="left"
          />

          <OfferSection
            title="Why Choose Us?"
            items={[
              "Quality Servers – Powerful and stable servers for smooth gaming experience.",
              "Regular Tournaments – Regular tournaments with exciting competitions.",
              "Security and Fairness - Fair play and reliable protection from violators.",
              "Strong Community – An active community of like-minded people and players.",
              "Continuous Development – Constant updates and improvements for a better experience.",
            ]}
            imgSrc={img2}
            imgAlt="image for second block of about"
            imgPosition="right"
          />
        </div>

        <AboutDevelopers />
      </div>
    </div>
  );
}

export default AboutPage;
