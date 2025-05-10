import HomePage from "./pages/home/HomePage.jsx";
import AboutPage from "./pages/aboutPage/AboutPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import RulesPage from "./pages/rules/RulesPage.jsx";
import "./base-styles/reset.css";
import BetaTesterForm from "./components/betaTesterForm/BetaTesterForm.jsx";
import Arena from "./pages/aboutPage/Arena.jsx";
import Team from "./pages/aboutPage/Team.jsx";
import Help from "./pages/aboutPage/Help.jsx";
import Terms from "./pages/aboutPage/Terms.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />}>
              <Route index element={<Navigate to="arena" replace />} />
              <Route path="arena" element={<Arena />} />
              <Route path="team" element={<Team />} />
              <Route path="help" element={<Help />} />
              <Route path="terms" element={<Terms />} />
            </Route>
            {/* <Route path="/servers" element={<ServersPage />} /> */}
            <Route path="/beta-tester" element={<BetaTesterForm />} />
            <Route path="/rules" element={<RulesPage />} />
            {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
