// import { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [countries, setCountries] = useState([]);
//   const [countryName, setCountryName] = useState("");
//   const [filteredCountryName, setFilteredCountryName] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://studies.cs.helsinki.fi/restcountries/api/all")
//       .then((res) => {
//         const data = res.data;
//         setCountries(data);
//       });
//   }, []);

//   const handleChange = (event) => {
//     setCountryName(event.target.value);
//     // const fil = countries.some((c) => c.name.common === countryName);
//     // console.log(fil);

//     const filteredCountryNames = countries.filter((country) =>
//       country.name.common.toLowerCase().includes(countryName.toLowerCase())
//     );

//     // if (filteredCountryNames.length > 10) {
//     //   console.log("Too many matches");
//     //   return setFilteredCountryName(["Too many matches"]);
//     // } else {
//     setFilteredCountryName(filteredCountryNames);
//     // }
//   };

//   return (
//     <div>
//       <h2>Countries</h2>
//       <form>
//         <label>find Countries: </label>
//         <input onChange={handleChange} />
//       </form>
//       <p>input: {countryName}</p>

//       <h1>filteredCountries:</h1>

//       {filteredCountryName.length >= 10 ? (
//         <p>Too many matches, specify another filter</p>
//       ) : (
//         filteredCountryName.map((c, i) => {
//           return <p key={i}>{c.name.common}</p>;
//         })
//       )}
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [filteredCountryName, setFilteredCountryName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const data = res.data;
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   // This effect runs whenever countryName changes
  //   const filteredCountryNames = countries.filter((country) =>
  //     country.name.common.toLowerCase().includes(countryName.toLowerCase())
  //   );
  //   setFilteredCountryName(filteredCountryNames);
  // }, [countryName, countries]);

  useEffect(() => {
    // This effect runs whenever countryName changes
    const filteredCountryNames = countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
      .sort((a, b) =>
        a.name.common.localeCompare(b.name.common, undefined, {
          sensitivity: "base",
        })
      );
    setFilteredCountryName(filteredCountryNames);
  }, [countryName, countries]);

  const handleChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <h2>Countries</h2>
      <form>
        <label>Find Countries: </label>
        <input
          onChange={handleChange}
          value={countryName}
          placeholder="Enter country name"
        />
      </form>
      <p>Input: {countryName}</p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <h1>Filtered Countries:</h1>

      {filteredCountryName.length >= 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountryName.map((country, i) => (
          <Country
            show={show}
            key={i}
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            flag={country.flag}
            languages={Object.values(country.languages)}
          />
        ))
      )}
    </div>
  );
};

export default App;
