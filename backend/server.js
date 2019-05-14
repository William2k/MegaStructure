const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config");
const dbInit = require("./db/dbConnection");
const tokenMiddleware = require("./middlewares/token.middleware");
const publicUserRoutes = require("./routes/public-user.routes");

const mainInit = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(compression());

  app.use("/api/user", publicUserRoutes);

  app.listen(config.serverPort, () => {
    console.log("Server is running on Port: " + config.serverPort);
  });
};

dbInit();
mainInit();
