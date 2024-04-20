import { useDispatch } from "react-redux";
import { addAnecdote, createAnecdote } from "../reducers/anecdoteReducer"; // Assuming that's the correct path to your reducer
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(setNotification(`${content} was added to anecdotes`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
    // Dispatch the addAnecdote action using the action creator
    dispatch(createAnecdote(content));
    dispatch(addAnecdote({ content }));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
