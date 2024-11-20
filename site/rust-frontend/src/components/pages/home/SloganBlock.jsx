import "./home-styles/SloganBlock.css"
import bg from "../../../../public/sloganBG.jfif"
function SloganBlock(){
    return <section className="slogan">
        <div className="slogan__container">
            <div className="slogan__box">
                <h2 className="slogan__box_title">Buy a Server Pass and Win 100x More!</h2>
                <p className="slogan__box_information">Purchase a pass to our exclusive server and get the chance to win 100 times more than the price of the pass! The more you play, the bigger your rewards. Don't miss out on the opportunity to get massive bonuses and enhance your gaming experience!</p>
                <a href="app/servers" className="slogan__box_btn">Watch Price</a>
            </div>
            <div className="slogan__box_img">
                <img src={bg} alt="slogan bg" className="sloganBg"/>
            </div>
        </div>
    </section>
}

export default SloganBlock;