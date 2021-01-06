import React from "react";

/**
 * Filter/search input box
 */
const Filter = ({ text, handleInput }) => (
  <div>
    {text} <input onChange={handleInput} />
  </div>
);

export default Filter;
