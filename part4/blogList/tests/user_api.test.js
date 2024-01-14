const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
});

describe("user creation", () => {
  test("Should create a valid user", async () => {
    const user = {
      username: "Anton",
      name: "vedant",
      password: "vedant@test",
    };
    const res = await api.post("/api/user").send(user);
    // console.log(res.status);
    expect(res.status).toBe(201);
  });

  test("should not create a inValid user which has less than 3 characters in name or password", async () => {
    const user = {
      username: "An",
      name: "vedant",
      password: "vedant@test",
    };
    const res = await api.post("/api/user").send(user);
    expect(res.status).toBe(400);
  });
});
