import "./Footer.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, sed
            libero! In, magni recusandae. Aspernatur tempore nihil provident
            ullam quod nam vero dolores doloribus omnis atque. Quas magni ea
            sunt?
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="mid">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="right">
          <h2>GET IN TOUCH</h2>
          <li>+11-7746-XXXXX</li>
          <li>contact@tomato.com</li>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Tomato.com -All Rights Reserveds.
      </p>
    </div>
  );
};

export default Footer;
