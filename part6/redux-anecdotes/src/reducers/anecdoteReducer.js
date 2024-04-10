import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const initialState = anecdotesAtStart.map((content, id) => ({
  content,
  id: id.toString(),
  votes: 0,
}));

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
      return [...state, newAnecdote]; // Return new state array with the new anecdote added
    },
  },
});

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
