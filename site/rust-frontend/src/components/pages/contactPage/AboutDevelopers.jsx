import React from "react";

const developers = [
  { id: 1, name: "Kravchenko Dmytro", role: "Fullstack Developer", img: "../../../../public/Dmytro.jpg" },
  { id: 2, name: "Serhiy Buhtiyarov", role: "Plugin Developer", img: "../../../../public/Dmytro.jpg" },
  { id: 3, name: "Ilarion Parkhomenko", role: "Social Media Manager", img: "../../../../public/Dmytro.jpg" }
];

const AboutDevelopers = () => {
  return (
    <div className="developers">
      {developers.map((dev) => (
        <div key={dev.id} className="developers__card">
          <div className="developers__image">
            <img src={dev.img} alt={dev.name} />
          </div>
          <div className="developers__info">
            <h3 className="developers__name">{dev.name}</h3>
            <p className="developers__role">{dev.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutDevelopers;
