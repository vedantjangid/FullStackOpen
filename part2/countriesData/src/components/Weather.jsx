import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather({ name }) {
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const baseUrl = "https://goweather.herokuapp.com/weather/";
    const country = name;
    axios.get(baseUrl + country).then((res) => {
      setTemp(res.data.temperature);
      setWind(res.data.wind);
      setDesc(res.data.description);
    });
  }, []);

  return (
    <div>
      <h2>Weather in {name}</h2>
      <h3>Temprature : {temp}</h3>
      <h3>Wind : {wind}</h3>
      <h3>Description : {desc}</h3>
    </div>
  );
}

export default Weather;
