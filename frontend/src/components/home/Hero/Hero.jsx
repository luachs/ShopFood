import React from "react";
import "./hero.css";
import Button from "../../Button/Button";
const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Best food for your taste</h1>
        <p className="hero-description">
          Discover delectable cuisine and unforgettable moments in our
          welcoming, culinary haven.
        </p>
        <div className="hero-button">
          <Button primary>Order now</Button>
          <Button outline>Explore Menu</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
