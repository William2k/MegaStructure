const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("../config");
const dbInit = require("./db");
const middlewares = require("./middlewares");
const routes = require("./routes");

const mainInit = () => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(compression());

  app.use("/api/user", routes.publicUserRoutes);
  app.use("/api/user", middlewares.token.checkToken, routes.userRoutes);
  app.use("/api/site", middlewares.token.checkToken, routes.siteRoutes);

  app.listen(config.serverPort, () => {
    console.log("Server is running on Port: " + config.serverPort);
  });
};

dbInit();
mainInit();
