const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGODB_PASS;

const url = `mongodb+srv://root:${password}@cluster0.dktlfnt.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(console.log("connected to th Database"))
  .catch((e) => console.log(e.message));

const personSchema = mongoose.Schema({
  name: String,
  number: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", personSchema);
