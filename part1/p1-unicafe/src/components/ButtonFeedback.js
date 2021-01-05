import React from "react";

/**
 * Reusable button component for each feedback
 */
const ButtonFeedback = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

export default ButtonFeedback;
