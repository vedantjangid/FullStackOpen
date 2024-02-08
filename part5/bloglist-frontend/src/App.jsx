// App.jsx

import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import "./style.css";
import NewBlog from "./components/newBlog";
import AllBlogs from "./components/AllBlogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [blogForm, setBlogForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [newBlogAdded, setNewBlogAdded] = useState(false);

  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      // Sort blogs based on the number of likes in descending order
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
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

  const handleSubmit = async (blog) => {
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const newBlog = await blogService.addNewBlog(blog, config);

      if (newBlog) {
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
        setNewBlogAdded(true);
        setTitle(newBlog.title);
        setAuthor(newBlog.author);

        setTimeout(() => {
          setNewBlogAdded(false);
          setTitle("");
          setAuthor("");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog);
      const updatedBlogs = await blogService.getAll();
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error("Error liking the blog:", error.message);
    }
  };

  const handleRemove = (id) => {
    // Filter out the deleted blog from the blogs array
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  const hideWhenVisible = { display: blogForm ? "none" : "" };
  const showWhenVisible = { display: blogForm ? "" : "none" };

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
              A new blog {title} added successfully by {author}
            </h3>
          )}

          <div>
            <div style={hideWhenVisible}>
              <button onClick={() => setBlogForm(true)}>New Blog</button>
            </div>
            <div style={showWhenVisible}>
              <h2 className="main-heading">Create New Blog</h2>
              <NewBlog onSubmit={handleSubmit} />
              <button onClick={() => setBlogForm(false)}>Cancel </button>
            </div>
          </div>

          <AllBlogs
            user={user}
            blogs={blogs}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        </>
      )}
    </div>
  );
};

export default App;
