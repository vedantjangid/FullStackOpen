import { useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  // Selecting the showNotification state from Redux store
  const showNotification = useSelector((state) => state.notification);

  return (
    <div>
      {/* Rendering Notification component conditionally based on showNotification */}
      <Notification notification={showNotification} />

      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
