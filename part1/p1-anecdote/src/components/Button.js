import React from "react";

/**
 * Reusable button component
 */
const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

export default Button;
