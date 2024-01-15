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

// blogsRouter.post("/api/blogs", ...)
blogsRouter.post("/api/blogs", async (request, response) => {
  try {
    const token = request.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    const blogData = request.body;

    // Check if request.user is defined
    if (!request.user || !request.user.id) {
      return response.status(401).json({ error: "Token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      ...blogData,
      user: user._id,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);

    await user.save();

    response.status(201).json(result);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  try {
    const userToken = request.user;
    if (!userToken) {
      return response.status(401).json({ error: "Token missing" });
    }

    if (!userToken.id) {
      return response.status(401).json({ error: "Token invalid" });
    }

    const user = await User.findById(userToken.id);

    const blogToDelete = await Blog.findById(request.params.id);

    if (!blogToDelete) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blogToDelete.user._id.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      return response.status(204).end();
    } else {
      return response.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return response.status(401).json({ error: "Invalid token" });
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
