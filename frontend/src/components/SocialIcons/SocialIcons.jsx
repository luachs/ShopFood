import React from "react";

import Facebook from "../assets/images/icon_social/Facebook.png";
import Instagram from "../assets/images/icon_social/Instagram.png";
import Github from "../assets/images/icon_social/Github.png";
import Twitter from "../assets/images/icon_social/Twitter.png";

const SocialIcons = ({ primary = false }) => {
  const socialContainer = {
    display: "flex",
    gap: "12px",
  };

  const socialLink = {
    borderRadius: "50%",
    padding: "15px",
    width: "6px",
    height: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary ? "#ad343e" : "#f9f9f726",
    userSelect: "none",
  };

  return (
    <div style={socialContainer}>
      <a href="#" style={socialLink}>
        <img src={Facebook} alt="Facebook" />
      </a>
      <a href="#" style={socialLink}>
        <img src={Instagram} alt="Instagram" />
      </a>
      <a href="#" style={socialLink}>
        <img src={Twitter} alt="Twitter" />
      </a>
      <a href="#" style={socialLink}>
        <img src={Github} alt="Github" />
      </a>
    </div>
  );
};

export default SocialIcons;
