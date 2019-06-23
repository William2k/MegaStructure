import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  normalisedUsername: String,
  firstname: String,
  lastname: String,
  emailAddress: String,
  password: String
});

User.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj._id;
  delete obj.password;
  return obj;
};

export default { user: mongoose.model("User", User) };

// module.exports = mongoose.model("User", User);
