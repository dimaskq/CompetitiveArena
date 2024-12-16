import React from 'react';
import "./contactPage-styles/contactPage.css";

function AboutPage() {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1 className="about-title">
                    <span className="title-glow">We Are Game Changers</span>
                </h1>
                <p className="about-description">
                    Welcome, traveler! We are a team of passionate developers on a mission to connect people, boost teamwork, and help everyone earn a living doing what they love.
                </p>
                <p className="about-description">Our goal? Competitive to earn!</p>

                <a className="about-button" href='/servers'>
                    Let's play
                </a>
            </div>
        </div>
    );
}

export default AboutPage;