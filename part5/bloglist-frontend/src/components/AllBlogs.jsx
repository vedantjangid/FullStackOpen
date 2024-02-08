import Blog from "./Blogs";

const AllBlogs = ({ blogs, user, handleLike, handleRemove }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default AllBlogs;
