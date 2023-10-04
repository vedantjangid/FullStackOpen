import React from "react";

const Persons = ({ filteredPersons, noteDeletion, setPersons, persons }) => (
  <div>
    {filteredPersons.map((person) => (
      <div
        key={person.id}
        style={{
          display: "flex",
          flexDirection: "row",
          height: 30,
          alignItems: "center",
        }}
      >
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button
          style={{ height: 20, marginLeft: 5 }}
          onClick={() => {
            const userConfirmed = window.confirm(`Delete ${person.name} ?`);

            if (userConfirmed) {
              noteDeletion(person.id);
            } else {
              console.log("User clicked Cancel");
            }
          }}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default Persons;
