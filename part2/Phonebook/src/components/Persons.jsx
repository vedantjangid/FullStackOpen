import React from "react";

const Persons = ({ filteredPersons, noteDeletion, setPersons, persons }) => (
  <div>
    {filteredPersons.map((person) => (
      <>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button
          onClick={() => {
            const userConfirmed = window.confirm(`Delete ${person.name} ?`);

            if (userConfirmed) {
              console.log();
              noteDeletion(person.id);
            } else {
              console.log("User clicked Cancel");
            }
          }}
        >
          Delete
        </button>
      </>
    ))}
  </div>
);

export default Persons;
