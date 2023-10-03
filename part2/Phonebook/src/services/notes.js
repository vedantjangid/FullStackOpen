import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  console.log("before");
  return axios.get(baseUrl);
};

const create = (newObject) => {
  axios.post(baseUrl, newObject);
};

const deleteNote = (id) => {
  axios.delete(`${baseUrl}/${id}`);
  return id;
};

const update = async (id, newObject) => {
  await axios.put(`${baseUrl}/${id}`, newObject);
};

export { getAll, create, deleteNote, update };
