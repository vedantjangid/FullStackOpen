const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  try {
    response.send("Blogs website");
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogsRouter.get("/api/blogs", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.status(200).json(blogs);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogsRouter.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
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
