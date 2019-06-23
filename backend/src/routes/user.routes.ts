import express from "express";
const routes = express.Router();

import userModels from "../models/user.model";

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
