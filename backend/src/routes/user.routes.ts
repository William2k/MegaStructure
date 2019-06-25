import express from "express";

import userModels from "../models/user.model";

const routes = express.Router();
const User = userModels.user as any;

routes.route("/").get((req: any, res) => {
  User.findOne({ normalisedUsername: req.decoded.normalisedUsername })
    .then((resultUser: any, err: any) => {
      if (resultUser) {
        res.json({
          username: resultUser.username,
          emailAddress: resultUser.emailAddress,
          success: true
        });
      } else {
        res.status(400).send("Login attepted failed");
      }
    })
    .catch((err: any) => console.log(err));
});

export default routes;
