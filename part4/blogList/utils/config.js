require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.DB_CONNECTION_STRING_TEST
    : process.env.DB_CONNECTION_STRING;

// const MONGODB_URI =
//   process.env.NODE_ENV === "test"
//     ? process.env.DB_CONNECTION_STRING
//     : process.env.DB_CONNECTION_STRING;

const BASE_URL = "http://localhost:3003";

module.exports = {
  MONGODB_URI,
  PORT,
  BASE_URL,
};
