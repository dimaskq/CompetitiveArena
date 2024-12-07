import "./home-styles/SloganBlock.css"
import bg from "../../../../public/aboutBg.jpg"


function AboutBlockHome(){
    return <section className="aboutBlockHome">
        <div className="slogan__container_about container">
            <div className="slogan__box">
                <h2 className="slogan__box_title">Learn more about us!</h2>
                <p className="slogan__box_information">Curious about who we are and what we do? Click the button below to discover our story, mission, and how we work. Find out what drives our project and why we can be your trusted choice!</p>
                <a href="app/contact" className="slogan__box_btn">Learn more</a>
            </div>
            <div className="slogan__box_img">
                <img src={bg} alt="slogan bg" className="sloganBg"/>
            </div>
        </div>
    </section>
}

export default AboutBlockHome;