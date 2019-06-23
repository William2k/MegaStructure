import express from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

import config from ".";
import dbInit from "./db";
import middlewares from "./middlewares";
import routes from "./routes";

const routesInit = (app: express.Express) => {
  app.use("/api/user", routes.publicUserRoutes);
  app.use("/api/user", middlewares.token.checkToken, routes.userRoutes);
  app.use("/api/site", middlewares.token.checkToken, routes.siteRoutes);
};

const middlewaresInit = (app: express.Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(compression());
};

const mainInit = () => {
  const app = express();
  middlewaresInit(app);
  routesInit(app);

  app.listen(config.serverPort, () => {
    console.log("Server is running on Port: " + config.serverPort);
  });
};

dbInit();
mainInit();
