const mongoose = require("mongoose");
const config = require("../config");

if (config.environment === "development") {
    mongoose.set("debug", true);
  }

const init = () => {
  mongoose
      .connect(config.dbHost, { useNewUrlParser: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
        console.log( err);
      });
}

module.exports = init;