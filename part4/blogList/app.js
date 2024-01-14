const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const tokenExtractor = require("./utils/tokenExtractor");

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

app.use(tokenExtractor);
app.use(cors());
app.use(express.json());

app.use("/", blogsRouter);
app.use("/api/user", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
