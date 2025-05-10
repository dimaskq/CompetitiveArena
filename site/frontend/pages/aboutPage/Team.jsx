import "./aboutPage-styles/aboutPage.css";
import Dima from "../../assets/Serhiy.jpg";
import Lar from "../../assets/Dmytro.jpg";
import Ser from "../../assets/Ilarion.jpg";
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
            <img src={Dima} alt="Team Member 1" className="team__photo-img" />
            <p className="team__photo-name">Serhii Bukhtiiarov</p>
          </div>
          <div className="team__photo">
            <img src={Lar} alt="Team Member 2" className="team__photo-img" />
            <p className="team__photo-name">Dmytro Kravchenko</p>
          </div>
          <div className="team__photo">
            <img src={Ser} alt="Team Member 3" className="team__photo-img" />
            <p className="team__photo-name">Ilarion Parkhomenko</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
