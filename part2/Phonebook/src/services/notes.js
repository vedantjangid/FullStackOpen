import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  console.log("before");
  return axios.get(baseUrl);
};

const create = (newObject) => {
  axios.post(baseUrl, newObject);
};

export { getAll, create };
