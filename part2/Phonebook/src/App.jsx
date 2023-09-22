import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const onSubmitButton = (event) => {
    const nameExists = persons.some((person) => person.name === newName);

    event.preventDefault();
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      let prson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(prson));
    }

    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter:
          <input
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>
      </form>
      <h2>Add a new Number</h2>
      <form>
        <div>
          name:
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          number:
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button onClick={onSubmitButton} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

      {/* {persons.map((p) => (
        <p key={p.name}>
          {p.name} {p.number}
        </p>
      ))} */}

      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
