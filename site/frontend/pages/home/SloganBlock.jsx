import "./home-styles/SloganBlock.css";
import video from "../../assets/videoplayback.mp4";

function SloganBlock() {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="slogan">
      <div className="slogan__container">
        <div className="slogan__box">
          <h2 className="slogan__box_title">Competitive Arena</h2>
          <p className="slogan__box_information">Only skill matters here!</p>
          <div className="slogan__btn_container">
            <a href="/contact" className="slogan__box_btn">
              About Us
            </a>
            <a href="https://discord.gg/wtxWjyf6" className="slogan__box_btn">
              Join Discord
            </a>
          </div>
        </div>
        <div className="slogan__arrow_container" onClick={handleScroll}>
          <div className="slogan__arrow"></div>
        </div>

        <div className="slogan__video-container">
          <video
            className="videoTag"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={video} type="video/mp4" />
            Ваш браузер не підтримує відео тег.
          </video>
        </div>
      </div>
    </section>
  );
}

export default SloganBlock;
