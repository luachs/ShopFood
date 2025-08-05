import React, { useState } from "react";
import "./FormContact.css";
import InputField from "../../InputField/InputField";

const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-inner" data-aos="fade-up">
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <InputField
                name="name"
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="form-group">
              <InputField
                name="email"
                label="Email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>

          <div className="form-group">
            <InputField
              name="subject"
              label="Subject"
              placeholder="Write a subject"
              value={formData.subject}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message"
              rows="5"
            ></textarea>
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
