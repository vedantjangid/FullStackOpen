import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAll, create } from "../src/services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      create(newPerson);
      console.log("posted");
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  // useEffect(() => {
  //   console.log("effect");

  //   const eventHandler = (response) => {
  //     console.log("promise fulfilled", response.data);
  //   };

  //   const promise = axios.get("http://localhost:3001/persons");
  //   promise.then(eventHandler);
  // }, []);

  useEffect(() => {
    getAll().then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
