import React from "react";
import "./footer-styles/Footer.css";
import logo from "../../assets/logo-removebg.png";

function Footer() {
  const email = "dmtro.kravchenko@gmail.com";
  const phone = "+420607153870";
  const address = "Europe";

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__block footer__block_logo">
          <img src={logo} alt="Company logo" />
          <p className="footer__block_text">The world belongs to the brave.</p>
        </div>
        <div className="footer__block">
          <h2 className="footer__block_title">Contact Info</h2>
          <p className="footer__block_text">Address: {address}</p>
          <p className="footer__block_text">Phone: {phone}</p>
          <p className="footer__block_text">
            E-mail: <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
