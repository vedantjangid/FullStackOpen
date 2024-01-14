const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

usersRouter.get("/", async (req, res) => {
  try {
    // const firstBlog = await Blog.findOne();

    // Get all users
    const users = await User.find({}).populate("blogs");

    // Iterate over each user and push the firstBlog to their blogs array
    // for (const user of users) {
    //   user.blogs.push(firstBlog);
    // }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password must be at least 3 characters long.",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    response.status(401).json(error.message);
    console.log(error.message);
  }
});

module.exports = usersRouter;
