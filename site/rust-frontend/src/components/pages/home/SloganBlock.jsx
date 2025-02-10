import "./home-styles/SloganBlock.css";
import video from "../../../../public/videoplayback.mp4";

function SloganBlock() {
    const handleScroll = () => {
        window.scrollBy({
            top: window.innerHeight, // Прокрутка на высоту окна
            behavior: "smooth",      // Плавная анимация
        });
    };

    return (
        <section className="slogan">
            <div className="slogan__container">
                <div className="slogan__box">
                    <h2 className="slogan__box_title">Competitive2Earn</h2>
                    <p className="slogan__box_information">Purchase a pass to our exclusive</p>
                    <div className="slogan__btn_container">
                        <a href="app/servers" className="slogan__box_btn">Watch Price</a>
                        <a href="app/servers" className="slogan__box_btn">Join Discord</a>
                    </div>
                </div>
                <div className="slogan__arrow_container" onClick={handleScroll}>
                    <div className="slogan__arrow"></div>
                </div>
                <video className="videoTag" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </section>
    );
}

export default SloganBlock;
