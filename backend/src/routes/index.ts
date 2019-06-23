import express from "express";

import publicUserRoutes from "./public-user.routes";
import userRoutes from "./user.routes";
import siteRoutes from "./site.routes";
import middlewares from "../middlewares";

const routesInit = (app: express.Express) => {
  app.use("/api/user", publicUserRoutes);
  app.use("/api/user", middlewares.token.checkToken, userRoutes);
  app.use("/api/site", middlewares.token.checkToken, siteRoutes);
};

export default routesInit;
