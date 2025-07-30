import React from "react";
import "./IntroStats.css";
import img from "../../assets/images/IntroStats/IntroStats.png";

const IntroStats = () => {
  return (
    <div className="intro-stats" data-aos="fade-up">
      <div className="intro-stats-content">
        <h1>A little information for our valuable guest</h1>
        <p>
          At place, we believe that dining is not just about food, but also
          about the overall experience. Our staff, renowned for their warmth and
          dedication, strives to make every visit an unforgettable event.
        </p>
        <div className="intro-stats-boxes">
          <div className="intro-stats-box">
            <div className="number">3</div>
            <p>locations</p>
          </div>
          <div className="intro-stats-box">
            <div className="number">1995</div>
            <p>Founded</p>
          </div>
          <div className="intro-stats-box">
            <div className="number">65+</div>
            <p>Staff Member</p>
          </div>
          <div className="intro-stats-box">
            <div className="number">100%</div>
            <p>Satisfied Customers</p>
          </div>
        </div>
      </div>
      <img src={img} alt="" />
    </div>
  );
};

export default IntroStats;
