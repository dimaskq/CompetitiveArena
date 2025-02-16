import React from 'react';
import "./aboutPage-styles/aboutPage.css";
import bg from "../../../../public/aboutPageBg.avif"
function AboutPage() {
    return (
        <div className="about-page">
            <h1 className="about__title">
                About Us
            </h1>
            <div className="about__container">
                    <div className="about__text_container">
                        <p className='about__text_top'>Welcome to Competitive Arena — your portal to the world of the best Rust servers! We offer a unique opportunity to enjoy high-quality game worlds and participate in exciting tournaments.</p>
                        <h2 className='about__text_offer'>What We Offer:</h2>
                        <ul className='about__text_list'>
                            <li className='about__list_item'>Convenient access to high-quality Rust servers.</li>
                            <li className='about__list_item'>Tournaments with unique rules and valuable prizes.</li>
                            <li className='about__list_item'>Support and assistance for all participants.</li>
                            <li className='about__list_item'>Stability and security — no failures, just gaming!</li>
                        </ul>
                    </div>
                <div class="about__join_container">
                    <a className='about__join_btn' href="https://discord.gg/jf6UAxab">Join Discord</a>
                </div>
            </div>    
        </div>
    );
}

export default AboutPage;