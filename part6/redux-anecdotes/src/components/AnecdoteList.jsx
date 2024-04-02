import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const vote = (id) => {
    dispatch({
      type: "vote_anecdote",
      id: id,
    });
    // console.log("vote", id);
  };
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
