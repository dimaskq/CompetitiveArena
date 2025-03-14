import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function OfferSection({ title, items, imgSrc, imgAlt, imgPosition }) {
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
    return () => AOS.refreshHard();
  }, []);

  return (
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
}

export default OfferSection;
