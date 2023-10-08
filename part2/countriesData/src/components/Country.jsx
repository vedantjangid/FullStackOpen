// import React from "react";

// function Country({ name, capital, area, flag, languages, show, handleShow }) {
//   return show ? (
//     <div>
//       <h3>{name}</h3>
//       <p>Capital: {capital}</p>
//       <p>Area: {area}</p>
//       Languages:{" "}
//       <ul>
//         {languages.map((l) => (
//           <li key={l}>{l}</li>
//         ))}
//       </ul>
//       <h1 style={{ fontSize: 200, padding: 0, margin: 0 }}>{flag}</h1>
//     </div>
//   ) : (
//     <div>
//       <h3>{name}</h3>
//       <button onClick={handleShow}>Show</button>
//     </div>
//   );
// }

// export default Country;

import React, { useState } from "react";
import Weather from "./Weather";

function Country({ name, capital, area, flag, languages }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleShow = () => {
    setShowDetails(!showDetails); // Toggle the state when the button is clicked
  };

  return (
    <div>
      <h3>{name}</h3>
      {showDetails ? (
        <div>
          <p>Capital: {capital}</p>
          <p>Area: {area}</p>
          <p>Languages:</p>
          <ul>
            {languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <h1 style={{ fontSize: 200, padding: 0, margin: 0 }}>{flag}</h1>
          <Weather name={name} />
          <button onClick={handleShow}>hide</button>
        </div>
      ) : (
        <div>
          <button onClick={handleShow}>Show</button>
        </div>
      )}
    </div>
  );
}

export default Country;
