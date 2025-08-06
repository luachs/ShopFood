import React from "react";

import HeaderContact from "./components/HeaderContact/HeaderContact";
import FooterContact from "./components/FooterContact/FooterContact";
import FormContact from "./components/FormContact/FormContact";

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
