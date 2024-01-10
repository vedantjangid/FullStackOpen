const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("correct amount of blogs is returned", async () => {
  const response = await api.get("/api/blogs");
  //   console.log(response.body);
  expect(response.body.length).toBe(initialBlogs.length);
});

test("Verifying the existence of the id property", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(initialBlogs.length);
  response.body.forEach((blog) => {
    // console.log(blog.id);
    expect(blog.id).toBeDefined();
  });
});

test("successfully creates a new blog post", async () => {
  const initialResponse = await api.get("/api/blogs");

  newBlog = {
    title: "nothing new just to check",
    author: "vedant jangid",
    url: "www.example.com",
    likes: 1234,
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialResponse.body.length + 1);
  //   console.log(initialResponse.body.length);
  //   console.log(response.body.length);
});

test("A blog with no likes gets default of 0 likes", async () => {
  const initialResponse = await api.get("/api/blogs");

  newBlog = {
    title: "likes check with no likes added to body",
    author: "vedant",
    url: "www.example1.com",
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");

  // Check if the last item exists and has the likes property
  const arr = response.body;
  const lastItem = arr.length - 1;

  //   console.log(arr[lastItem].likes);
  //   arr.map((blog) => {
  //     console.log(blog.likes);
  //   });
  expect(arr[lastItem].likes).toBe(0);
});

test("if no link is provided", async () => {
  const initialResponse = await api.get("/api/blogs");
  newBlog = {
    author: "vedant jangid",
    likes: 1234,
  };
  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(400);
});

test("Delete a note by id", async () => {
  newBlog = {
    title: "nothing new just to check",
    author: "vedant jangid",
    url: "www.example.com",
    likes: 1234,
  };

  const noteAdded = await api.post(`/api/blogs`).send(newBlog);

  const id = noteAdded.body.id;

  const deleted = await api.delete(`/api/blogs/${id}`);

  expect(deleted.status).toBe(204);
  //   console.log(deleted);
});

test("Updating the likes", async () => {
  const newBlog = {
    title: "Full Stack",
    author: "StackMaster",
    url: "https://stack.com/",
    likes: 1,
  };

  const result = await api.post("/api/blogs").send(newBlog);

  newBlog.likes += 1;

  //   console.log(newBlog);

  const newResult = await api.put(`/api/blogs/${result.body.id}`).send(newBlog);

  //   console.log("newResult", newResult.body);
  //   console.log(result.body);

  expect(newResult.body.likes).toBe(newBlog.likes);
});

// test("if blog is added with no votes zero will be assumed", async () => {
//   const newBlog = {
//     title: "Half Stack",
//     author: "StackDiscipline",
//     url: "https://halfstack.com/",
//   };

//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .set("Authorization", `bearer ${token}`);

//   expect(response.body.likes).toBeDefined();
// });

// test("if blog is added with no url or title it will not be added", async () => {
//   const newBlog = {
//     author: null,
//     url: "https://stack.com/",
//     likes: 1,
//   };

//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .set("Authorization", `bearer ${token}`);

//   expect(response.status).toBe(400);
// });

// test("a blog may be removed by issuing http delete request", async () => {
//   const newBlog = {
//     title: "Full Stack",
//     author: "StackMaster",
//     url: "https://stack.com/",
//     likes: 1,
//   };

//   const result = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .set("Authorization", `bearer ${token}`);

//   const response = await api.get(`/api/blogs/${result.body.id}`);
//   const deleteBlog = await api
//     .delete(`/api/blogs/${result.body.id}`)
//     .set("Authorization", `bearer ${token}`);
//   expect(deleteBlog.status).toBe(204);
// });

// test("a blog may be edited by issuing http put request", async () => {
//   const newBlog = {
//     title: "Full Stack",
//     author: "StackMaster",
//     url: "https://stack.com/",
//     likes: 1,
//   };

//   const result = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .set("Authorization", `bearer ${token}`);

//   newBlog.likes += 1;

//   await api
//     .put(`/api/blogs/${result.body.id}`)
//     .send(newBlog)
//     .set("Authorization", `bearer ${token}`);
//   const newResult = await api.get(`/api/blogs/${result.body.id}`);
//   expect(newResult.body.likes).toBe(newBlog.likes);
// });

// test("cannot add blogs without a valid token", async () => {
//   const newBlog = {
//     title: "Full Stack",
//     author: "StackMaster",
//     url: "https://stack.com/",
//     likes: 1,
//   };

//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .set("Authorization", `bearer badly forged token`);

//   expect(response.status).toBe(401);
// });

afterAll(() => {
  mongoose.connection.close();
});
