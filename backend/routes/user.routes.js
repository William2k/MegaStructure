const express = require("express");
const routes = express.Router();

let User = require("../models/user.model");

routes.route("/").get((req, res) => {
  User.findOne({ normalisedUsername: req.decoded.normalisedUsername })
    .then((resultUser, err) => {
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
    .catch(err => console.log(err));
});

module.exports = routes;
