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

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    let sameNameId;

    persons.forEach((person) => {
      if (person.name === newName) {
        sameNameId = person.id;
      }
    });

    console.log(nameExists.id);
    if (nameExists) {
      const userConfirmed = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (userConfirmed) {
        console.log("clicked ok");
        const newPerson = {
          name: newName,
          number: newNumber,
        };

        update(sameNameId, newPerson).catch(() => {
          setAlert(`the note '${newName}' was already deleted from server`);
          setPersons(persons.filter((n) => n.name !== newName));
        });

        setAlert(`Number was changed for ${newName}`);
        setTimeout(() => {
          setAlert(null);
        }, 5000);

        getAll().then((response) => {
          const data = response.data;
          setPersons(data);
        });
        setNewName("");
        setNewNumber("");
      } else {
        console.log("User clicked Cancel");
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      create(newPerson);
      setAlert(`${newName} was added to phonebook`);
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      console.log("posted");
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const nameExists = persons.some((person) => person.name === newName);

  //   let sameNameId;

  //   persons.forEach((person) => {
  //     if (person.name === newName) {
  //       sameNameId = person.id;
  //     }
  //   });

  //   console.log(sameNameId);

  //   console.log(nameExists.id);
  //   if (nameExists) {
  //     const userConfirmed = window.confirm(
  //       `${newName} is already added to the phonebook, replace the old number with a new one`
  //     );

  //     if (userConfirmed) {
  //       console.log("clicked ok");
  //       const newPerson = {
  //         name: newName,
  //         number: newNumber,
  //       };

  //       try {
  //         const updatedPerson = await update(sameNameId, newPerson);

  //         // Check if the updated person is undefined or null
  //         if (!updatedPerson) {
  //           console.error("Error updating person: Person is undefined or null");
  //           return;
  //         }

  //         // Update the persons state with the new information
  //         setPersons((prevPersons) =>
  //           prevPersons.map((person) =>
  //             person.id === sameNameId ? updatedPerson : person
  //           )
  //         );
  //       } catch (error) {
  //         console.error("Error updating note:", error);
  //         // Handle the error, e.g., display an error message to the user
  //       }
  //     } else {
  //       console.log("User clicked Cancel");
  //     }
  //   } else {
  //     const newPerson = {
  //       name: newName,
  //       number: newNumber,
  //     };
  //     try {
  //       const createdPerson = await create(newPerson);

  //       // Check if the created person is undefined or null
  //       if (!createdPerson) {
  //         console.error("Error creating person: Person is undefined or null");
  //         return;
  //       }

  //       // Update the persons state with the new person
  //       setPersons([...persons, createdPerson]);
  //       console.log("posted");
  //       setNewName("");
  //       setNewNumber("");
  //     } catch (error) {
  //       console.error("Error creating note:", error);
  //       // Handle the error, e.g., display an error message to the user
  //     }
  //   }
  // };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  //   const filteredPersons = persons.filter((person) =>
  //   person?.name?.toLowerCase().includes(filter.toLowerCase())
  // );

  // const noteDeletion = (id) => {
  //   console.log("clicked");
  //   deleteNote(id);
  // };

  const noteDeletion = async (id) => {
    console.log("clicked");
    try {
      const deletedId = await deleteNote(id);
      // Filter out the deleted note from the persons state
      const updatedPersons = persons.filter(
        (person) => person.id !== deletedId
      );
      setPersons(updatedPersons);
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

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
        filteredPersons={filteredPersons}
        noteDeletion={noteDeletion}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
