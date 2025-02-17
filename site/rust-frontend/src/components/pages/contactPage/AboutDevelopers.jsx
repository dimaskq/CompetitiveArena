import React from "react";
import dmytroIMG from "../../../../public/Dmytro.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const developers = [
    { id: 1, name: "Kravchenko Dmytro", role: "Fullstack Developer", img: dmytroIMG, delay: 800 },
    { id: 2, name: "Serhiy Buhtiyarov", role: "Plugin Developer", img: dmytroIMG, delay: 900 },
    { id: 3, name: "Ilarion Parkhomenko", role: "Social Media Manager", img: dmytroIMG, delay: 1000 }
];
  
  const AboutDevelopers = () => {
    return (
      <div className="developers">
        <h2 className="developers__title">Our Team</h2>
        <div className="developers__container">
          {developers.map((dev) => (
            <div 
              key={dev.id} 
              className="developers__card" 
              data-aos="flip-left" 
              data-aos-delay={dev.delay}
            >
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
      </div>
    );
  };
export default AboutDevelopers;
