import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

console.log(initialState);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdote = state.find((anec) => anec.id === action.payload);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    addAnecdote: (state, action) => {
      const { content } = action.payload;
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0,
      };
      state.push(newAnecdote);
    },
  },
});

// const reducer = (state = initialState, action) => {
//   // console.log("state now: ", state);
//   // console.log("action", action);

//   let to_vote;
//   let voted;
//   let newAnecdoteContent;
//   let newAnecdoteId;
//   let newAnecdote;

//   switch (action.type) {
//     case "vote_anecdote":
//       // console.log(action.id);

//       to_vote = state.find((anec) => anec.id === action.id);
//       voted = {
//         ...to_vote,
//         votes: (to_vote.votes += 1),
//       };
//       // console.log(state.find((anec) => anec.id === action.id));
//       return state.map((anecdote) =>
//         anecdote.id !== action.id ? anecdote : voted
//       );

//     case "add_anecdote":
//       // console.log(action.payload.content);
//       newAnecdoteContent = action.payload.content;
//       newAnecdoteId = getId();
//       newAnecdote = {
//         content: newAnecdoteContent,
//         id: newAnecdoteId,
//         votes: 0,
//       };
//       return [...state, newAnecdote];
//     default:
//       return state;
//   }
// };

export default anecdoteSlice.reducer;
export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions;