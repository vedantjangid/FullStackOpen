import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import { getAll, create, deleteNote, update } from "../src/services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [alert, setAlert] = useState("");
  const [key, setKey] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (newName.trim() === "") {
        showAlert("Name cannot be empty");
        return;
      }

      const nameExists = persons.some((person) => person.name === newName);
      const sameNameId = persons.find((person) => person.name === newName)?.id;

      if (nameExists) {
        const userConfirmed = window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        );

        if (userConfirmed) {
          const newPerson = {
            name: newName,
            number: newNumber,
          };

          try {
            await update(sameNameId, newPerson);
            showAlert(`Number was changed for ${newName}`);
            const response = await getAll();
            setPersons(response.data);
            setNewName("");
            setNewNumber("");
          } catch (error) {
            showAlert(
              `Failed to update ${newName}: ${
                error.response ? error.response.data.error : error.message
              }`
            );
          }
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
        };

        try {
          const createdPerson = await create(newPerson);
          console.log(createdPerson.data.name);
          showAlert(`${createdPerson.data.name} was added to phonebook`);
          setPersons([...persons, createdPerson.data]);
          setNewName("");
          setNewNumber("");
        } catch (error) {
          if (error.response && error.response.status === 400) {
            showAlert(`Validation error: ${error.response.data.error}`);
          } else {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const noteDeletion = async (id) => {
    try {
      await deleteNote(id);
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    getAll().then((response) => {
      const data = response.data;
      setPersons(data);
      const key = data.id;
      setKey(key);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={alert} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        key={key}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons
        filteredPersons={persons.filter(
          (person) =>
            person &&
            person.name &&
            person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        noteDeletion={noteDeletion}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
