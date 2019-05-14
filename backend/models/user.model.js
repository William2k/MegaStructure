const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  normalisedUsername: String,
  firstname: String,
  lastname: String,
  emailAddress: String,
  password: String,
});

module.exports = mongoose.model("User", User);
