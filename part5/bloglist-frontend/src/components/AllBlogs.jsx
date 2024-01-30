import React, { useState } from "react";
import Blog from "./Blogs";

const AllBlogs = ({ blogs, user }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog user={user} key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default AllBlogs;
