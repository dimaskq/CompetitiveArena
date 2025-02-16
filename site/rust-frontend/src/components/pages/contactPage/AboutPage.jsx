import React from 'react';
import "./aboutPage-styles/aboutPage.css";
import img1 from "../../../../public/aboutList-img1.png"
import img2 from "../../../../public/aboutList-img2.jpeg"
import Typewriter from "typewriter-effect";

function AboutPage() {
    return (
        <div className="about-page">
            <h1 className="about__title">
                About Us
            </h1>
            <div className="about__container">
                    <div className="about__text_container">
                        <p className="about_text_top">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Welcome to Competitive Arena — your portal to the world of the best Rust servers!"
                                    ],
                                    autoStart: true,
                                    loop: false,
                                    delay: 10, 
                                    deleteSpeed: 10,
                                    pauseFor: 5000,
                                }}
                            />
                        </p>

                        <div className="about__info_box">
                            <img src={img1} alt="image for first block of about" />
                            <div className="about__list_container">
                                <h2 className='about__text_offer'>What We Offer:</h2>
                                <ul className='about__text_list'>
                                    <li className='about__list_item'>Best Game Servers – just enjoy the game!</li>
                                    <li className='about__list_item'>Exciting Tournaments - Exciting tournaments for real champions. </li>
                                    <li className='about__list_item'>Fair Play - Fair play without cheaters and unfair advantages.</li>
                                    <li className='about__list_item'>Active Community - A friendly community of players ready to communicate and play together.</li>
                                    <li className='about__list_item'>Player Support - Fast and responsive support to resolve any issues.</li>
                                </ul>
                            </div> 
                        </div>
                        <div className="about__info_box">
                            <div className="about__list_container">
                                <h2 className='about__text_offer'>Why Choose Us?</h2>
                                <ul className='about__text_list'>
                                    <li className='about__list_item'>Quality Servers – Powerful and stable servers for smooth gaming experience.</li>
                                    <li className='about__list_item'>Regular Tournaments – Regular tournaments with exciting competitions.</li>
                                    <li className='about__list_item'>Security and Fairness - Fair play and reliable protection from violators.</li>
                                    <li className='about__list_item'>Strong Community – An active community of like-minded people and players.</li>
                                    <li className='about__list_item'>Continuous Development – Constant updates and improvements for a better experience.</li>
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