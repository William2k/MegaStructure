import express from "express";

import middlewares from "../middlewares";
import publicUserRoutes from "./public-user.routes";
import userRoutes from "./user.routes";
import publicSiteRoutes from "./public-site.routes";
import siteRoutes from "./site.routes";

const routesInit = (app: express.Express) => {
  app.use("/api/user", publicUserRoutes);
  app.use("/api/site", publicSiteRoutes);
  app.use("/api/user", middlewares.token.checkToken, userRoutes);
  app.use("/api/site", middlewares.token.checkToken, siteRoutes);
};

export default routesInit;
