import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdotes } from "../../services/requests";
import { useContext } from "react";
import notificationContext from "../notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const [message, messageDispatch] = useContext(notificationContext);

  const messageTimeout = (content) => {
    setTimeout(() => {
      messageDispatch({ type: "added", payload: content });
      setTimeout(() => messageDispatch({ type: "CLEAR" }), 5000);
    }, 1000);
  };

  const messageTimeoutError = () => {
    setTimeout(() => {
      messageDispatch({
        type: "error",
        payload: "Too short anecdote, must have a length 5 or more",
      });
      setTimeout(() => messageDispatch({ type: "CLEAR" }), 5000);
    }, 1000);
  };

  // const newNoteMutation = useMutation({
  //   mutationFn: createAnecdotes,
  //   onSuccess: queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  //   onError: (error) => {
  //     console.error("An error occurred while creating the anecdote:", error);
  //     messageDispatch({
  //       type: "error",
  //       payload: "Too short anecdote, must have a length 5 or more",
  //     });
  //   },
  // });

  const newNoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: (error) => {
      if (error.response.data.error.includes("Too short anecdote")) {
        // Dispatch error message only if it's related to anecdote length
        messageTimeoutError();
      } else {
        // Handle other types of errors
        console.error(
          "An error occurred while creating the anecdote:",
          error.response.data.error
        );
        // You may want to dispatch a different type of error message here
      }
    },
  });

  // const onCreate = async (event) => {
  //   event.preventDefault();
  //   const content = event.target.anecdote.value;
  //   if (content.length > 5) {
  //     messageTimeout(content);
  //   }
  //   console.log(content);
  //   event.target.anecdote.value = "";
  //   newNoteMutation.mutate({ content, votes: 0 });
  // };

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length >= 5) {
      messageTimeout(content);
    }

    event.target.anecdote.value = "";
    newNoteMutation.mutate({ content, votes: 0 });
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
