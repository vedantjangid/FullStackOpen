const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

let headers; // Move headers outside beforeEach to make it accessible across tests
let loginResponse;

beforeEach(async () => {
  // Delete all existing users and blogs
  await User.deleteMany({});
  await Blog.deleteMany({});

  // Create a new user
  const newUser = {
    username: "root",
    name: "root",
    password: "password",
  };
  await api.post("/api/user").send(newUser); // Adjust the endpoint if necessary

  // Log in the user
  loginResponse = await api
    .post("/api/login")
    .send({ username: "root", password: "password" });
  headers = {
    Authorization: `Bearer ${loginResponse.body.token}`,
  };

  // Create initial blogs
  const noteObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = noteObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

afterEach(async () => {
  // Delete the user created for the test
  await User.deleteMany({});
});

// beforeEach(async () => {
//   // Login the user before each test

//   loginResponse = await api
//     .post("/api/login")
//     .send({ username: "root", password: "password" });

//   headers = {
//     Authorization: `Bearer ${loginResponse.body.token}`,
//   };

//   // Create a root user

//   // Create blogs without user
//   await Blog.deleteMany({});
//   const noteObjects = helper.initialBlogs.map((blog) => new Blog(blog));
//   const promiseArray = noteObjects.map((blog) => blog.save());
//   await Promise.all(promiseArray);
// });

describe("Get blog information", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .set(headers)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs").set(headers);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the first blog is about React patterns", async () => {
    const response = await api.get("/api/blogs").set(headers);

    const contents = response.body.map((r) => r.title);

    expect(contents).toContain("React patterns");
  });

  test("The unique identifier property of the blog posts is by default _id", async () => {
    const blogs = await Blog.find({});
    expect(blogs[0]._id).toBeDefined();
  });
});

describe("Addition of a new blog", () => {
  test("A valid blog can be added ", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain("Canonical string reduction");
  });

  test("If title and url are missing, respond with 400 bad request", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    await api.post("/api/blogs").send(newBlog).set(headers).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("If the likes property is missing, it will default to 0 ", async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = await blogsAtEnd.find(
      (blog) => blog.title === "First class tests"
    );
    expect(addedBlog.likes).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
