const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

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

app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.json());

app.use("/", middleware.userExtractor, blogsRouter);
app.use("/api/user", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
