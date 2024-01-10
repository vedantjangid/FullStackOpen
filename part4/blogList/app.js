const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");

const mongoUrl = config.MONGODB_URI;

try {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected to mongo db");
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());

app.use("/", blogsRouter);
app.use("/api/user", usersRouter);

module.exports = app;
