const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  try {
    response.send("Blogs website");
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogsRouter.get("/api/blogs", async (request, response) => {
  try {
    // const firstUser = await User.findOne();

    const blogs = await Blog.find({}).populate({
      path: "user",
      select: "name username",
    });
    // If you want all blogs to have the same user details (for testing), set the user field for each blog
    // blogs.forEach((blog) => {
    //   blog.user = firstUser;
    // });

    response.status(200).json(blogs);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogsRouter.post("/api/blogs", async (request, response) => {
  const blogData = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...blogData,
    user: user._id, // Set the user ID for the blog
  });

  try {
    // const result = await blog.save();
    // response.status(201).json(result);

    const result = await blog.save();

    // Add the new blog post's ID to the user's blogs array
    user.blogs = user.blogs.concat(result._id);

    // Save the updated user data
    await user.save();

    // Respond with a JSON object containing the result of the blog creation
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  const id = request.params.id;

  try {
    // Use deleteOne on the model to delete a blog by its ID
    const result = await Blog.deleteOne({ _id: id });

    // Check if the blog was found and deleted
    if (result.deletedCount === 1) {
      response.status(204).end(); // No content, successful deletion
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogsRouter.put("/api/blogs/:id", async (request, response) => {
  const body = request.body;

  if (!body.likes) {
    body.likes = 0;
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });

    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = blogsRouter;
