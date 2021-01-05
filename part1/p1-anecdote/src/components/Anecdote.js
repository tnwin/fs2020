import Header from "./Header";

/**
 * Displays anecdote header, the selected anecdote, and its votes
 */
const Anecdote = ({ text, anecdotes, votes, selected }) => (
  <>
    <Header text={text} />
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
  </>
);

export default Anecdote;
