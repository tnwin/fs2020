import React from "react";

/**
 * Displays the total amount of exercises in parts
 */
const Total = ({ parts }) => (
  <p>
    Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
  </p>
);

export default Total;
