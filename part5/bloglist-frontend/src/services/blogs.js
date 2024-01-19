import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response.data;
};

const addNewBlog = async (data, config) => {
  console.log("Sent data:", data);
  const response = await axios.post("/api/blogs", data, config);
  return response.data;
};

export default { getAll, login, addNewBlog };
