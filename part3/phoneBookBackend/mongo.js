const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please enter your password");
  process.exit(1);
}

const password = process.argv[2];

const name = process.argv[3];

const number = process.argv[4];

// pE2ZnGuWyp3xWTyd

const url = `mongodb+srv://root:${password}@cluster0.dktlfnt.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: Number,
});

const Person = mongoose.model("Persons", personSchema);

const person = new Person({
  name,
  number: number,
});

person.save().then((result) => {
  console.log("added", name, "number", number, "to phonebook");
  mongoose.connection.close();
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((note) => {
      console.log(note.name, note.number);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}
