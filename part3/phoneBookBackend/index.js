const express = require("express");
var morgan = require("morgan");
var cors = require("cors");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

morgan.token("postData", (req) => {
  if (req.method === "POST" && req.body) {
    return JSON.stringify(req.body);
  } else {
    return "-";
  }
});

// Use the custom token in the log format
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData",
    {
      // ...other options...
    }
  )
);

const port = 3001;

let Persons = [
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
  const Person = Persons.find((p) => p.id === id);
  if (!Persons) {
    res.status(404).end();
  } else {
    res.json(Person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredPersons = Persons.filter((p) => p.id !== id);
  //   if (!filteredPersons) {
  //     res.status(404).end();
  //   } else {
  //     res.send(filteredPersons).status(204).end();
  //   }

  if (filteredPersons.length === Persons.length) {
    res.status(404).end();
  } else {
    Persons = filteredPersons; // Update the Persons array
    res.status(204).end(); // Respond with a 204 status code (No Content)
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const nameExists = Persons.some((p) => p.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number is missing" });
  } else if (nameExists) {
    return res
      .status(400)
      .json({ error: "A person with the same name already exists" });
  } else {
    const min = 0;
    const max = 19999999;
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    const person = {
      key: randomInt,
      id: randomInt,
      name: body.name,
      number: body.number,
    };

    Persons.push(person);

    return res.status(201).json(person);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`application running on port ${port}`);
});
