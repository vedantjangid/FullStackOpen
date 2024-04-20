import { createSlice } from "@reduxjs/toolkit";

import anecdotes from "../../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const { id } = action.payload;
      const anecdoteToVote = state.find((anec) => anec.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    addAnecdote: (state, action) => {
      const { content } = action.payload;
      const newAnecdote = {
        content,
        id: state.length.toString(), // Generating ID based on the length of the state array
        votes: 0,
      };
      state.push(newAnecdote);
    },
    // appendAnecdote: (state, action) => {
    //   state.push(action.payload);
    // },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdotes.getAll();
    dispatch(setAnecdotes(anecdote));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const res = await anecdotes.postAnecdote(content);
    dispatch(addAnecdote(res));
  };
};

export const voteA = (id) => {
  return async (dispatch) => {
    await anecdotes.voteAnecdote(id);
    dispatch(voteAnecdote({ id }));
  };
};

export default anecdoteSlice.reducer;
