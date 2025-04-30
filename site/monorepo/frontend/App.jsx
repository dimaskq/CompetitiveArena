import HomePage from "./pages/home/HomePage.jsx";
import AboutPage from "./pages/contactPage/AboutPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import ServersPage from "./pages/servers/Servers.jsx";
import Footer from "./components/footer/Footer.jsx";
import RulesPage from "./pages/rules/RulesPage.jsx";
import "./base-styles/reset.css";
import LeaderboardPage from "./pages/leaderboardPage/LeaderboardPage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<AboutPage />} />
            {/* <Route path="/servers" element={<ServersPage />} /> */}
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
