import express from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config";
import dbInit from "./db";
import routesInit from "./routes";

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

dbInit().then(() => mainInit());
