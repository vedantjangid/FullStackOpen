import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  const res = axios.post(baseUrl, newObject);
  return res;
};

const deleteNote = (id) => {
  axios.delete(`${baseUrl}/${id}`);
  return id;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data; // Return the updated object
};

// const update = async (id, newObject) => {
//   try {
//     const response = await axios.put(`${baseUrl}/${id}`, newObject);
//     return response.data; // Return the updated object
//   } catch (error) {
//     throw error; // Rethrow the error for the caller to handle
//   }
// };

export { getAll, create, deleteNote, update };
