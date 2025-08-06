import React from "react";
import "./hero.css";
import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";
import config from "@/config/config";
const Hero = () => {
  return (
    <div className="hero-section" data-aos="zoom-in" data-aos-duration="1000">
      <div className="hero-content">
        <h1 className="hero-title">Best food for your taste</h1>
        <p className="hero-description">
          Discover delectable cuisine and unforgettable moments in our
          welcoming, culinary haven.
        </p>
        <div className="hero-button">
          <Link to={config.routes.menu}>
            <Button primary>Order now</Button>
          </Link>
          <Link to={config.routes.menu}>
            <Button outline>Explore Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
