import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import "./style.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedBlogappUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // blogService.setToken(parsedUser.token); // Assuming you have a function to set the token in your blogService
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      setUser(null);
      console.log(error.message);
    }

    console.log("logging in with", username, password);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    // Additional logic for logging out, such as redirecting or resetting other state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = user.token;
    // Create a blog object with title, author, and url
    const blog = {
      title,
      author,
      url,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      // Call blogService.addNewBlog to add a new blog
      const newBlog = await blogService.addNewBlog(blog, config);
      console.log(newBlog);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        {user == null ? (
          <>
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password
                <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit">login</button>
            </form>
          </>
        ) : (
          <>
            <h2>blogs</h2>
            <h3>{user.name} logged in</h3>
            <button onClick={() => handleLogout()}>Log Out</button>
            <h2>Create new blog</h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                justifyItems: "center",
                gap: 8,
              }}
              onSubmit={handleSubmit}
            >
              <label>
                Title:
                <input
                  onChange={({ target }) => setTitle(target.value)}
                  type="text"
                  name="title"
                  placeholder="Enter title"
                />
              </label>
              <label>
                Author:
                <input
                  onChange={({ target }) => setAuthor(target.value)}
                  type="text"
                  name="author"
                  placeholder="Enter author"
                />
              </label>
              <label>
                URL:
                <input
                  onChange={({ target }) => setUrl(target.value)}
                  type="url"
                  name="url"
                  placeholder="Enter URL"
                />
              </label>
              <button type="submit" style={{ width: 100 }}>
                Submit
              </button>
            </form>

            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default App;
