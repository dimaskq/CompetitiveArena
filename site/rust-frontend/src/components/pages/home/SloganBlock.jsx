import "./home-styles/SloganBlock.css";
import video from "../../../../public/videoplayback.mp4";

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
                    <p className="slogan__box_information">Play, Enjoy, Win</p>
                    <div className="slogan__btn_container">
                        <a href="/servers" className="slogan__box_btn">Watch Price</a>
                        <a href="https://discord.gg/jf6UAxab" className="slogan__box_btn">Join Discord</a>
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
