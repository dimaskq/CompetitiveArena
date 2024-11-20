import HomePage from "./components/pages/home/HomePage";
import ContactPage from "./components/pages/contactPage/ContactPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import ServersPage from "./components/servers/Servers";
import Footer from "./components/footer/Footer";
import "../src/base-styles/reset.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/app" element={<HomePage />} />
              <Route path="/app/contact" element={<ContactPage />} />
              <Route path="/app/servers" element={<ServersPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
