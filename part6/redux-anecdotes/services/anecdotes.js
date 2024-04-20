import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};

const voteAnecdote = async (id) => {
  let all = await getAll();
  const anecdoteToVote = all.find((anecdote) => anecdote.id === id);
  if (anecdoteToVote) {
    anecdoteToVote.votes += 1;
    await updateAnecdote(anecdoteToVote);
    return anecdoteToVote;
  }
};

export default { getAll, postAnecdote, voteAnecdote };
