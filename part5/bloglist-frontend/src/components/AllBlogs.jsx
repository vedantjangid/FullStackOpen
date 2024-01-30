import React, { useState } from "react";
import Blog from "./Blogs";

const AllBlogs = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default AllBlogs;
