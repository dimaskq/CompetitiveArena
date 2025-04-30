import "./home-styles/SloganBlock.css";
import bg from "../../assets/aboutBg.jpg";

function AboutBlockHome() {
  return (
    <section className="aboutBlockHome">
      <div className="slogan__container_about container">
        <div className="slogan__box">
          <h2 className="slogan__box_title slogan__box_title2">
            Learn more about us!
          </h2>
          <p className="slogan__box_information">
            Curious about who we are and what we do? Click the button below to
            discover our story, mission, and how we work. Find out what drives
            our project and why we can be your trusted choice!
          </p>
          <a href="/contact" className="slogan__box_btn">
            Learn more
          </a>
        </div>
        <div className="slogan__box_img">
          <img
            src={bg}
            alt="Background image for About Us section"
            className="sloganBg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutBlockHome;
