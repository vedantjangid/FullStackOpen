import { useSelector, useDispatch } from "react-redux";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";
import { voteA } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let res = anecdotes;
    if (filter) {
      res = anecdotes.filter((anecdote) => anecdote.content.includes(filter));
    }
    // console.log(res);
    return res;
  });

  const dispatch = useDispatch();
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  // const anecdotes = useSelector(({ filter, anecdotes }) => {
  //
  // });

  const vote = (id, content) => {
    dispatch(setNotificationWithTimeout(`you voted '${content}'`, 5));
    dispatch(voteA(id));
    // console.log("vote", id);
  };
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
