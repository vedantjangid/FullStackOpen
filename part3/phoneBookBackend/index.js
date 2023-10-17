const express = require("express");

const app = express();

const port = 3001;

const Persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(Persons);
});

app.get("/info", (req, res) => {
  const total = Persons.length;
  //   res.send(total);
  //   res.status(200).send({ total: total });
  const date = Date();
  //   res.send(`Phone book has info for ${total} people\n\n${date}`);
  res.send(`Phone book has info for ${total} people<br><br>${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = Persons.find((p) => p.id === id);
  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

app.listen(port, () => {
  console.log(`application running on port ${port}`);
});
