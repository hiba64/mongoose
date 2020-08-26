const express = require("express");
const mongoose = require("mongoose");
// Install and setup mongoose:

require("dotenv").config({ path: ".env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Create a person having this prototype

var Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});
//create Model

var personModel = mongoose.model("person", PersonSchema);

// Create and Save a Record of a Model

var person = new personModel({
  name: "ahmed",
  age: 25,
  favoriteFoods: ["fish", "patatos", "banana"],
});

person.save(function (err, data) {
  if (err) {
    console.log("err to save model");
  }
  console.log("element is added");
});
// Create Many Records with model.create()
var arrayOfPeople = [
  { name: "sami", age: 60, favoriteFoods: ["couscous", "pasta"] },
  { name: "asma", age: 40, favoriteFoods: ["orange", "bread"] },
  { name: "amina", age: 35, favoriteFoods: ["sandwich", "fin"] },
  { name: "rim", age: 21, favoriteFoods: ["banana", "chocolate"] },
];
personModel.create(arrayOfPeople, (err, data) => {
    if (err) console.log(err);
    else console.log(arrayOfPeople);
  });
  // Use model.find() to Search Your Database
personModel
.find({ name: "asma" })
.then((doc) => {
  console.log(doc);
})
.catch((err) => {
  console.error(err);
});
//Use model.findOne() to Return a Single Matching Document from Database
personModel
  .findOne({ favoriteFoods: { $in: ["pasta"] } })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
  //Use model.findById() to Search Your Database By _id

personModel
.findById({
  _id: "5f44dedd18802522ec48d1bd",
})
.then((doc) => {
  console.log(doc);
})
.catch((err) => {
  console.error(err);
});
//   Perform Classic Updates by Running Find, Edit, then Save

personModel.findById("5f44cfabe547d400c402b5e6", (err, person) => {
  if (err) console.log(err);
  person.favoriteFoods.push("Kiwi");
  person.save((err, person) => {
    if (err) console.log(err);
    console.log(person);
  });
});
// Perform New Updates on a Document Using model.findOneAndUpdate()

personModel.findOneAndUpdate(
  { name: "rim" },
  { age: 19},
  { new: true },
  (err, person) => {
    if (err) console.log(err);
    console.log(person);
  }
);

// Delete One Document Using model.findByIdAndRemove

personModel.findOneAndRemove("5f46b45ec0470613ec2c4021", (err, person) => {
  if (err) console.log(err);
  console.log(person);
});
// MongoDB and Mongoose - Delete Many Documents with model.remove()

personModel.deleteMany({ name: "sami" }, (err, person) => {
  if (err) console.log(err);
  console.log("Person(s) with name 'sami' was deleted");
});
// Chain Search Query Helpers to Narrow Search Results

personModel
  .find({ favoriteFoods: { $in: ["bread"] } })
  .sort({name: 'asc'} )
  .limit(2)
  .select("-age")
  .exec()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));