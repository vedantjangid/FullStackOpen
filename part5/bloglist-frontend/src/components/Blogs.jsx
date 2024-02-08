// Blog.jsx

import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const removeBlog = async () => {
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let text = `Remove Blog ${blog.title} \n by${blog.author} `;
    const res = window.confirm(text);
    if (res) {
      try {
        await blogService.remove(blog.id, config);
        handleRemove(blog.id); // Call the handleRemove function to update state
        // Perform any additional actions after successful removal
      } catch (error) {
        console.error("Error removing the blog:", error.message);
      }
    }
  };

  return (
    <div className="blog">
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-author">Author: {blog.author}</p>
      {visible && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: 30 }} className="blog-author">
                  Likes: {blog.likes}
                </p>
                <button
                  onClick={() => handleLike(blog)}
                  style={{ paddingTop: 5, paddingBottom: 5 }}
                >
                  Like
                </button>
              </div>
              <p className="blog-author">Url: {blog.url}</p>
            </div>
            <div>
              <button onClick={removeBlog} style={{ margin: 10 }}>
                Remove
              </button>
            </div>
          </div>
        </>
      )}
      <button onClick={toggleVisibility} className="visibility">
        {visible ? "hide" : "show"}
      </button>
    </div>
  );
};

export default Blog;
