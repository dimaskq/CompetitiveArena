import HomePage from "./components/pages/home/HomePage";
import ContactPage from "./components/pages/contactPage/ContactPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import ServersPage from "./components/pages/servers/Servers";
import Footer from "./components/footer/Footer";
import RulesPage from "./components/pages/rules/RulesPage";
import "../src/base-styles/reset.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/servers" element={<ServersPage />} />
              <Route path="/rules" element={<RulesPage />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
