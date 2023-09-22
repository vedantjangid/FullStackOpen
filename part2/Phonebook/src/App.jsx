import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onSubmitButton = (event) => {
    event.preventDefault();
    let prson = {
      name: newName,
    };
    setPersons(persons.concat(prson));
    setNewName("");
  };
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          <button onClick={onSubmitButton} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </div>
  );
};

export default App;
