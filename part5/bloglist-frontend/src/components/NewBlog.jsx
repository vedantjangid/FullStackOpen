import React from "react";
import { useState, useEffect } from "react";

const NewBlog = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };

    // Call the onSubmit callback with the blog object
    onSubmit(blog);

    // Reset success state after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setTitle(""); // Reset title
      setAuthor(""); // Reset author
      setUrl("");
    }, 3000);
  };

  return (
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
  );
};

export default NewBlog;
