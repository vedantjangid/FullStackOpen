import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import "./style.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newBlogAdded, setNewBlogAdded] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [loginError, setLoginError] = useState(null);

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
      setLoginError(null); // Reset login error if login is successful
    } catch (error) {
      setUser(null);
      setLoginError("Wrong username or password");
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

      // Check if it is successful
      if (newBlog) {
        // If successful, add the new blog to the list of blogs
        setBlogs(blogs.concat(newBlog));
        setNewBlogAdded(true);
        // Reset success state after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setNewBlogAdded(false);
          setTitle("");
          setAuthor("");
          setUrl("");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="app-container">
      {user == null ? (
        <>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {loginError && <h1 className="error-message">{loginError}</h1>}
        </>
      ) : (
        <>
          <h2 className="main-heading">Blogs</h2>
          <h3 className="user-info">{user.name} logged in</h3>
          <button onClick={() => handleLogout()} className="logout-button">
            Log Out
          </button>
          {newBlogAdded && (
            <h3>
              A newblog {title} added successfully by {author}
            </h3>
          )}

          <h2 className="main-heading">Create New Blog</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                onChange={({ target }) => setTitle(target.value)}
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                onChange={({ target }) => setAuthor(target.value)}
                type="text"
                id="author"
                name="author"
                value={author}
                placeholder="Enter author"
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL:</label>
              <input
                onChange={({ target }) => setUrl(target.value)}
                type="url"
                id="url"
                name="url"
                value={url}
                placeholder="Enter URL"
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          {blogs.map((blog) => (
            <div key={blog.id} className="blog">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-author">Author: {blog.author}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
