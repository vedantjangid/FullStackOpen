import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdotes } from "../../services/requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newNoteMutation.mutate({ content, votes: 0 });
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
