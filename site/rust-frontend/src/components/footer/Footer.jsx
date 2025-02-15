import "./footer-styles/Footer.css"
import logo from "../../../public/logo-removebg.png";
function Footer(){
    return <footer className="footer">
        <div className="footer__container">
            <div className="footer__block footer__block_logo">
                <img src={logo} alt="logo" />
                <p className="footer__block_text">The world belongs to the brave.</p>
            </div>
            <div className="footer__block">
                <h2 className="footer__block_title">Contact Info</h2>
                <p className="footer__block_text">Address : London</p>
                <p className="footer__block_text">Phone: +420607153870</p>
                <p className="footer__block_text">E-mail : workemail@gmail.com</p>
            </div>
        </div>
    </footer>
}

export default Footer;