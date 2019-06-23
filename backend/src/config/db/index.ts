import mongoose from "mongoose";
import config from "..";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

if (config.environment === "development") {
  mongoose.set("debug", true);
}

const init = () => {
  if (!config.dbHost) {
    console.error("Database connection error: Db Host not set");
    return;
  }

  mongoose
    .connect(config.dbHost, { useNewUrlParser: true })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err: any) => {
      console.error("Database connection error");
      console.log(err);
    });
};

export default init;
