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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        // Custom validation logic for the phone number
        const regex = /^(\d{2,3})-(\d+)$/; // Regex for the required format

        return regex.test(value);
      },
      message: "Invalid phone number format. Please use the format XX-XXXXXXX.",
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", personSchema);
