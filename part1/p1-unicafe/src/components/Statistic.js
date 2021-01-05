import React from "react";

/**
 * Reusable component to display each statistic neatly in a table row
 * */
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default Statistic;
