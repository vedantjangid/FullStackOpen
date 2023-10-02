import React from "react";

const userConfirmed = window.confirm("Do you want to proceed?");

if (userConfirmed) {
  // The user clicked "OK" in the confirm dialog
  // Your code for the "OK" action goes here
  console.log("User clicked OK");
} else {
  // The user clicked "Cancel" in the confirm dialog
  // Your code for the "Cancel" action goes here
  console.log("User clicked Cancel");
}

const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map((person) => (
      <>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button onClick={() => console.log(`deleted ${person.name}`)}>
          Delete
        </button>
      </>
    ))}
  </div>
);

export default Persons;
