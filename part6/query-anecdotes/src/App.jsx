import { useReducer } from "react";
import { getAnecdotes, vote } from "../services/requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notificationContext from "./notificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "vote":
        return `${action.payload} was voted`;
      case "added":
        return `${action.payload} was added to anecdotes`;
      case "CLEAR":
        return "";
      case "error":
        return action.payload;
      default:
        return state;
    }
  };

  const [message, messageDispatch] = useReducer(notificationReducer, "");

  const messageTimeout = (anecdote) => {
    setTimeout(() => {
      messageDispatch({ type: "vote", payload: anecdote.content });
      setTimeout(() => messageDispatch({ type: "CLEAR" }), 5000);
    }, 1000);
  };

  const voteMutation = useMutation({
    mutationKey: ["anecdotes"],
    mutationFn: (anecdote) => vote(anecdote.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    messageTimeout(anecdote);
    // console.log(anecdote.content, "vote");
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }
  return (
    <notificationContext.Provider value={[message, messageDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        {<Notification message={message} />}
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </notificationContext.Provider>
  );
};

export default App;
