import React from "react";

/**
 * Displays the total amount of exercises in parts
 */
const Total = ({ parts }) => (
  <strong>
    total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
  </strong>
);

export default Total;
