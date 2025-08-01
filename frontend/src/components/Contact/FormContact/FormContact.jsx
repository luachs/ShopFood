import React from "react";
import "./FormContact.css";

const FormContact = () => {
  return (
    <div className="contact-form-container">
      <div className="contact-form-inner" data-aos="fade-up">
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email address" />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input type="text" placeholder="Write a subject" />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Write your message" rows="5"></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
