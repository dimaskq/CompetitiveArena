import React from 'react';
import "./aboutPage-styles/aboutPage.css";
import img1 from "../../../../public/aboutList-img1.png"
import img2 from "../../../../public/aboutList-img2.jpeg"
function AboutPage() {
    return (
        <div className="about-page">
            <h1 className="about__title">
                About Us
            </h1>
            <div className="about__container">
                    <div className="about__text_container">
                        <p className='about__text_top'>Welcome to Competitive Arena — your portal to the world of the best Rust servers! We offer a unique opportunity to enjoy high-quality game worlds and participate in exciting tournaments.</p>
                        <div className="about__info_box">
                            <img src={img1} alt="image for first block of about" />
                            <div className="about__list_container">
                                <h2 className='about__text_offer'>What We Offer:</h2>
                                <ul className='about__text_list'>
                                    <li className='about__list_item'>Best Game Servers – just enjoy the game!</li>
                                    <li className='about__list_item'>Exciting Tournaments </li>
                                    <li className='about__list_item'>Fair Play</li>
                                    <li className='about__list_item'>Active Community</li>
                                    <li className='about__list_item'>Player Support </li>
                                </ul>
                            </div> 
                        </div>
                        <div className="about__info_box">
                            <div className="about__list_container">
                                <h2 className='about__text_offer'>Why Choose Us?</h2>
                                <ul className='about__text_list'>
                                    <li className='about__list_item'>Quality Servers</li>
                                    <li className='about__list_item'>Regular Tournaments</li>
                                    <li className='about__list_item'>Security and Fairness</li>
                                    <li className='about__list_item'>Strong Community</li>
                                    <li className='about__list_item'>Continuous Development</li>
                                </ul>
                            </div>
                            <img src={img2} alt="image for second block of about" />
                        </div>
                    </div>
                <div class="about__join_container">
                    <a className='about__join_btn' href="https://discord.gg/jf6UAxab">Join Discord</a>
                </div>
            </div>    
        </div>
    );
}

export default AboutPage;