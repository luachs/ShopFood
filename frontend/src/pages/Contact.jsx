import React from "react";

import HeaderContact from "../components/Contact/HeaderContact/HeaderContact";
import FooterContact from "../components/Contact/FooterContact/FooterContact";
import FormContact from "../components/Contact/FormContact/FormContact";

const Contact = () => {
  return (
    <div className="container page-contact">
      <HeaderContact />
      <FormContact />
      <FooterContact />
    </div>
  );
};

export default Contact;
