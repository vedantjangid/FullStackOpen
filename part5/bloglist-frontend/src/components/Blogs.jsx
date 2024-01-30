import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      <h3 className="blog-title">{blog.title}</h3>
      {visible && (
        <>
          <p className="blog-author">Author: {blog.author}</p>
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: 30 }} className="blog-author">
              Likes: {blog.likes}
            </p>
            <button style={{ paddingTop: 5, paddingBottom: 5 }}>Like</button>
          </div>
          <p className="blog-author">Url: {blog.url}</p>
        </>
      )}
      <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
    </div>
  );
};

export default Blog;
