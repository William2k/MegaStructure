const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Site = new Schema({
  name: String,
  type: String,
  owner: String,
  managers: [String],
  lastModified: [{ date: Date, user: String }]
});

module.exports = mongoose.model("Site", Site);
