import React, { useState } from "react";
import "./App.css";
import Anecdote from "./components/Anecdote";
import Button from "./components/Button";

/**
 * Display daily anecdote and the top anecdote with its votes
 */
const App = ({ anecdotes }) => {
  // Return random anecdote index that's not the current
  const getRandomAnecdoteIndex = (index) =>
    Math.floor(Math.random() * anecdotes.length);

  // States
  const [selected, setSelected] = useState(getRandomAnecdoteIndex);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // Handle "next anecdote" button click
  const nextAnecdote = () => setSelected(getRandomAnecdoteIndex);

  // Handle "vote" button click
  const voteAnecdote = (anecdote) => () =>
    setVotes((prevVotes) => {
      const newVotes = [...prevVotes];
      newVotes[anecdote] += 1;

      return newVotes;
    });

  // Index of the currently selected anecdote
  const currAnecdoteIndex = anecdotes.indexOf(anecdotes[selected]);

  // Index of anecdote with the most votes
  const topAnecdoteIndex = votes.reduce(
    (topIndex, curr, currIndex, currArr) =>
      curr > currArr[topIndex] ? currIndex : topIndex,
    0
  );

  return (
    <div>
      <Anecdote
        text="Anecdote of the day"
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
      <Button text="vote" handleClick={voteAnecdote(currAnecdoteIndex)} />
      <Button text="next anecdote" handleClick={nextAnecdote} />

      {/* Conditionally render top anecdotes when there is at least 1 vote */}
      {votes.some((vote) => vote > 0) ? (
        <Anecdote
          text="Anecdote with most votes"
          anecdotes={anecdotes}
          votes={votes}
          selected={topAnecdoteIndex}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
