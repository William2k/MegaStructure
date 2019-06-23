import mongoose from "mongoose";
import config from "../config";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

if (config.environment === "development") {
  mongoose.set("debug", true);
}

const init = () => {
  const promise = new Promise((resolve, reject) => {
    if (!config.dbHost) {
      console.error("Database connection error: Db Host not set");
      return reject();
    }

    mongoose
      .connect(config.dbHost, { useNewUrlParser: true })
      .then(() => {
        console.log("Database connection successful");
        resolve();
      })
      .catch((err: any) => {
        console.error("Database connection error");
        console.log(err);
        reject();
      });
  });

  return promise;
};

export default init;
