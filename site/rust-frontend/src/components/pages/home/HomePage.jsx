import "../../../base-styles/reset.css"
import ServersPage from "../../pages/servers/Servers";
import AboutBlockHome from "./AboutBlockHome";
import SloganBlock from "./SloganBlock";
import SwiperInvestors from "./SwiperInvestors";

function HomePage (){
    return <div className="home">
        <SloganBlock />
        <SwiperInvestors />
        <AboutBlockHome />
        <ServersPage />
    </div>
}

export default HomePage;