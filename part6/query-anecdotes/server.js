import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.get("/", (req, res) => {
  console.log("logged");
  res.json("Anecdotes API");
});

const validator = (request, response, next) => {
  const { content } = request.body;

  if (request.method === "POST" && (!content || content.length < 5)) {
    return response.status(400).json({
      error: "Too short anecdote, must have a length of 5 or more characters.",
    });
  } else {
    next();
  }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
