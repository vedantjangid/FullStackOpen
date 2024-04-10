import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

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
    dispatch(setNotification(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
    dispatch(voteAnecdote({ id })); // dispatch the voteAnecdote action creator

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
