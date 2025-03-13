import HomePage from "./components/pages/home/HomePage";
import AboutPage from "./components/pages/contactPage/AboutPage.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import ServersPage from "./components/pages/servers/Servers";
import Footer from "./components/footer/Footer";
import RulesPage from "./components/pages/rules/RulesPage";
import "../src/base-styles/reset.css";
import LeaderboardPage from "./components/pages/leaderboardPage/LeaderboardPage.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<AboutPage />} />
              <Route path="/servers" element={<ServersPage />} />
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
