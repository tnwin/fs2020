import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import ButtonFeedback from "./components/ButtonFeedback";
import Statistics from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Handle each button click
  const voteGood = () => setGood((prevGood) => prevGood + 1);
  const voteNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1);
  const voteBad = () => setBad((prevBad) => prevBad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <ButtonFeedback text="good" handleClick={voteGood} />
      <ButtonFeedback text="neural" handleClick={voteNeutral} />
      <ButtonFeedback text="bad" handleClick={voteBad} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
