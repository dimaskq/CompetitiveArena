import React from 'react';
import "./aboutPage-styles/aboutPage.css";
import img1 from "../../../../public/abutList-img1.png"
import img2 from "../../../../public/abutList-img2.jpeg"
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
                                    <li className='about__list_item'>Best Game Servers – We meticulously configure our servers to ensure low ping, anti-cheat protection, and smooth gameplay. You don't need to worry about technical issues – just enjoy the game!</li>
                                    <li className='about__list_item'>Exciting Tournaments – Regular competitions with unique modes, team and solo battles, and valuable prizes for the top players. Every event is an opportunity to showcase your skills and prove your worth!</li>
                                    <li className='about__list_item'>Fair Play – We maintain fairness and balance by ensuring protection from cheaters. The administration and anti-cheat systems work 24/7 to create a fair environment for all players.</li>
                                    <li className='about__list_item'>Active Community – Join thousands of players to discuss strategies, find friends and opponents, exchange experiences, and participate in community life. Our Discord server and forum are great places for interaction and tactics exchange.</li>
                                    <li className='about__list_item'>Player Support – Our team is always ready to assist, whether it’s technical questions, complaints, or suggestions. We value every member of our community and aim to make the game as comfortable as possible.</li>
                                </ul>
                            </div> 
                        </div>
                        <div className="about__info_box">
                            <img src={img2} alt="image for second block of about" />
                            <div className="about__list_container">
                                <ul className='about__text_list'>
                                    <li className='about__list_item'>Quality Servers – Enjoy lag-free and uninterrupted gameplay.</li>
                                    <li className='about__list_item'>Regular Tournaments – Win valuable prizes and prove your expertise.</li>
                                    <li className='about__list_item'>Security and Fairness – Active battle against cheaters and unfair players.</li>
                                    <li className='about__list_item'>Strong Community – Players who support each other and create a friendly atmosphere.</li>
                                    <li className='about__list_item'>Continuous Development – We regularly update our servers with new features and improvements.</li>
                                </ul>
                            </div>
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