import React from "react";
import "./aboutPage-styles/aboutPage.css";

const Team = () => {
  return (
    <div className="team">
      <section className="team__section">
        <h1 className="team__title">Together, We Are Strong</h1>
        <p className="team__text">
          Together, we work hard, innovate constantly, collaborate and solve
          different issues with out-of-the box solutions. But we also love
          having a good laugh, going for beers together after work and of course
          playing!
        </p>
      </section>

      <section className="team__section">
        <h2 className="team__subtitle">Meet the Team</h2>
        <div className="team__photos">
          <div className="team__photo">
            <img
              src="/path/to/photo1.jpg"
              alt="Team Member 1"
              className="team__photo-img"
            />
            <p className="team__photo-name">John Doe</p>
          </div>
          <div className="team__photo">
            <img
              src="/path/to/photo2.jpg"
              alt="Team Member 2"
              className="team__photo-img"
            />
            <p className="team__photo-name">Jane Smith</p>
          </div>
          <div className="team__photo">
            <img
              src="/path/to/photo3.jpg"
              alt="Team Member 3"
              className="team__photo-img"
            />
            <p className="team__photo-name">Mike Johnson</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
