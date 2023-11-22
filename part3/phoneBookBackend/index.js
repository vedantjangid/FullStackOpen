const express = require("express");
var morgan = require("morgan");
var cors = require("cors");
const Persons = require("./module/number");

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

// let Persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (req, res) => {
  Persons.find({}).then((data) => res.send(data));
});

app.get("/info", async (req, res) => {
  const total = await Persons.countDocuments({});
  //   res.send(total);
  //   res.status(200).send({ total: total });
  const date = Date();
  //   res.send(`Phone book has info for ${total} people\n\n${date}`);
  res.send(`Phone book has info for ${total} people<br><br>${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  // const id = Number(req.params.id);

  const Person = Persons.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "malformatted id" });
    });
  if (!Persons) {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Persons.findByIdAndDelete(id)
    .then((removedPerson) => {
      if (removedPerson) {
        // Successfully removed a person
        res.status(204).end(); // Respond with a 204 status code (No Content)
      } else {
        // No person found with the specified ID
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  try {
    const foundPerson = await Persons.findOne({ name: body.name }).exec();

    if (foundPerson) {
      // Person exists, update the data
      const updatedPerson = await Persons.findOneAndUpdate(
        { name: body.name },
        { new: true, runValidators: true, context: "query" },

        { number: body.number }, // Update the number (you can update other fields as needed)
        { new: true } // To return the updated document
      );
      console.log(body);
      res.json(updatedPerson);
    } else {
      // Person doesn't exist, create a new one
      const person = new Persons({
        name: body.name,
        number: body.number,
      });

      const savedPerson = await person.save();

      res.status(201).json(savedPerson);
    }
  } catch (err) {
    console.error("Error:", err.message);
    next(err); // Pass the error to the error handling middleware
  }
});

app.put("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const newPersonData = req.body;

  try {
    const updatedPerson = await Persons.findByIdAndUpdate(id, newPersonData, {
      new: true,
    });

    if (updatedPerson) {
      // The document was found and updated successfully
      res.json(updatedPerson);
    } else {
      // No document found with the specified ID
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  if (err.name === "CastError" && err.kind === "ObjectId") {
    // Handle the specific CastError caused by an invalid ID
    return res.status(500).send("Internal Server Error");
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).send("Internal Server Error"); // You can customize the error response as needed
});

app.listen(process.env.PORT || port, () => {
  console.log(`application running on port ${port}`);
});
