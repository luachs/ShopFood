import React from "react";
import "./Footer.css";

import Logo from "../Logo/Logo";
import SocialIcons from "../SocialIcons/SocialIcons";
import { Link } from "react-router-dom";
import config from "../../config/config";

import ImageSmall1 from "../assets/images/OurBlog/ImageSmall1.png";
import ImageSmall2 from "../assets/images/OurBlog/ImageSmall2.png";
import ImageSmall3 from "../assets/images/OurBlog/ImageSmall3.png";
import ImageSmall4 from "../assets/images/OurBlog/ImageSmall4.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Logo light />
          <p>
            In the new era of technology we look a in the future with certainty
            and pride to for our company and.
          </p>
          <SocialIcons primary />
        </div>
        <div className="footer-links">
          <h3>Pages</h3>
          <Link to={config.routes.home}>Home</Link>
          <Link to={config.routes.about}>About</Link>
          <Link to={config.routes.menu}>Menu</Link>
          <Link to={config.routes.pages}>Pages</Link>
          <Link to={config.routes.contact}>Contact</Link>
        </div>
        <div className="footer-utility">
          <h3>Utility Pages</h3>
          <a href="">Start</a>
          <a href="">Styleguide</a>
          <a href="">Password Protected</a>
          <a href="">404 Not Found</a>
          <a href="">Licenses</a>
          <a href="">Changelog</a>
          <a href="">View More</a>
        </div>
        <div className="follow-instagram">
          <h3>Follow Us on Instagram </h3>
          <div className="instagram-img">
            <img src={ImageSmall1} alt="" />
            <img src={ImageSmall2} alt="" />
            <img src={ImageSmall3} alt="" />
            <img src={ImageSmall4} alt="" />
          </div>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2023 Hashtag Developer. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
