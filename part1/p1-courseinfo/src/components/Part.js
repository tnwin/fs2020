import React from "react";

/**
 * Reusable component displaying the individual part with its exercise
 */
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

export default Part;
