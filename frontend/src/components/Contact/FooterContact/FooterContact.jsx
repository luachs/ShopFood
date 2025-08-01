import React from "react";
import "./FooterContact.css";

const FooterContact = () => {
  return (
    <div className="footer-contact" data-aos="fade-up">
      <div className="contact-item">
        <h2>Call Us:</h2>
        <p className="contact-call-phone">+84 123 456 789</p>
      </div>
      <div className="contact-item">
        <h2>Hours:</h2>
        <p>Mon-Fri: 11am - 8pm</p>
        <p>Sat, Sun: 9am - 10pm </p>
      </div>
      <div className="contact-item">
        <h2>Our Location:</h2>
        <p>123 Bridge Street Nowhere Land, LA 12345 United States</p>
      </div>
    </div>
  );
};

export default FooterContact;
