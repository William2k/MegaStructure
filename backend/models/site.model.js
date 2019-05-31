const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Site = new Schema({
  name: String,
  type: String,
  owner: String,
  managers: [String],
  lastModified: { date: Date, user: String }
});

Site.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj._id;
  return obj;
 }

module.exports = mongoose.model("Site", Site);
