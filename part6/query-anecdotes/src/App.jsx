import { getAnecdotes, vote } from "../services/requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationKey: ["anecdotes"],
    mutationFn: (anecdote) => vote(anecdote.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),

    // onSuccess: (newNote) => {
    //   const anecdote = queryClient.getQueryData(['anecdotes'])
    //   queryClient.setQueryData(['anecdotes'], anecdote.concat(newNote))
    // }
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
    // console.log(anecdote.content, "vote");
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
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
  );
};

export default App;
