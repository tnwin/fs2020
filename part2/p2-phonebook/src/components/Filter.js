import React from "react";

/**
 * The filter component
 */
const Filter = ({ text, filter, handleInput }) => (
  <div>
    {text}{" "}
    <input
      value={filter}
      onChange={handleInput}
      placeholder="Enter a name．．．"
    />
  </div>
);

export default Filter;
