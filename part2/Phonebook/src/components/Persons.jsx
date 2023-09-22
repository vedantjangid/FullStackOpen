import React from "react";

const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

export default Persons;
