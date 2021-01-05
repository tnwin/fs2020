import React from "react";
import Part from "./Part";

/**
 * Displays each part component from parts
 */
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
  </div>
);

export default Content;
