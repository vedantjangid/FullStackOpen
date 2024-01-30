import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
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

const like = async (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 };

  try {
    const response = await axios.put(`/api/blogs/${blog.id}`, updatedBlog);
    return response.data;
  } catch (error) {
    console.error("Error updating likes:", error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const remove = async (id, config) => {
  try {
    // console.log("id:", id);
    // console.log("config:", config);
    const response = await axios.delete(`/api/blogs/${id}`, config);
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};

export default { getAll, login, addNewBlog, like, remove };
