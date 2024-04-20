import axios from "axios";

const baseUrl = "http://localhost:3001";

const getAnecdotes = async () => {
  const res = await axios.get(`${baseUrl}/anecdotes`);
  //   console.log(res.data);
  return await res.data;
};

const createAnecdotes = async (content) => {
  const res = await axios.post(`${baseUrl}/anecdotes`, content);
  return await res.data;
};

const updateAnecdote = async (toVote) => {
  const response = axios.put(`${baseUrl}/anecdotes/${toVote.id}`, toVote);
  return response.data;
};

const vote = async (id) => {
  const all = await getAnecdotes();
  const anecdoteToVote = all.find((anecdote) => anecdote.id === id);
  if (anecdoteToVote) {
    anecdoteToVote.votes += 1;
    await updateAnecdote(anecdoteToVote);
    return anecdoteToVote;
  }
  console.log(anecdoteToVote.votes, "Voted");
};

export { getAnecdotes, createAnecdotes, vote };
