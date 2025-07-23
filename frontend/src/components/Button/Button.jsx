import React from "react";
import "./Button.css";
const Button = ({
  children,
  primary = false,
  outline = false,
  small = false,
  onClick,
  className = "",
  ...passProps
}) => {
  let classes = "btn";

  if (primary) {
    classes += " primary";
  }
  if (outline) {
    classes += " outline";
  }
  if (small) {
    classes += " small";
  }

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <button className={classes.trim()} onClick={onClick} {...passProps}>
      {children}
    </button>
  );
};

export default Button;
