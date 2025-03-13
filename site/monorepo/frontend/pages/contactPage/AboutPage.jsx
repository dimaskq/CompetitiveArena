import React, { useEffect } from "react";
import "./aboutPage-styles/aboutPage.css";
import img1 from "../../assets/aboutList-img1.png";
import img2 from "../../assets/aboutList-img2.jpeg";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutDevelopers from "./AboutDevelopers";

const OfferSection = ({ title, items, imgSrc, imgAlt, imgPosition }) => (
  <div className="about__info_box">
    {imgPosition === "left" && (
      <img
        src={imgSrc}
        alt={imgAlt}
        data-aos="fade-right"
        data-aos-delay="300"
        loading="lazy"
      />
    )}
    <div
      className="about__list_container"
      data-aos="fade-left"
      data-aos-delay="300"
    >
      <h2 className="about__text_offer">{title}</h2>
      <ul className="about__text_list">
        {items.map((item, index) => (
          <li key={index} className="about__list_item">
            {item}
          </li>
        ))}
      </ul>
    </div>
    {imgPosition === "right" && (
      <img
        src={imgSrc}
        alt={imgAlt}
        data-aos="fade-left"
        data-aos-delay="500"
        loading="lazy"
      />
    )}
  </div>
);

function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
    return () => AOS.refreshHard(); // Очищення ефекту
  }, []);

  const typewriterText = (
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
