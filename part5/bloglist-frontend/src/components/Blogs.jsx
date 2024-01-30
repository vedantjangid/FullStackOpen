import React, { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const Like = async () => {
    console.log(blog.id);
    await blogService.like(blog);
  };

  const removeBlog = async () => {
    const token = user.token;
    // Create a blog object with title, author, and url

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let text = `Remove Blog ${blog.title} \n by${blog.author} `;
    const res = window.confirm(text);
    if (res) {
      await blogService.remove(blog.id, config);
    }
    // console.log(res);
    // console.log(config);
  };

  return (
    <div className="blog">
      <h3 className="blog-title">{blog.title}</h3>
      {visible && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p className="blog-author">Author: {blog.author}</p>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: 30 }} className="blog-author">
                  Likes: {blog.likes}
                </p>
                <button
                  onClick={() => Like()}
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
      <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
    </div>
  );
};

export default Blog;
