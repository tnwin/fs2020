import React from "react";
import Statistic from "./Statistic";

/** Displays the statistics if available */
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = `${(good / all) * 100} %`;

  return all > 0 ? (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  );
};

export default Statistics;
