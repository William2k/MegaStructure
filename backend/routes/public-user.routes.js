const express = require("express");
const bcrypt = require("bcrypt");
const routes = express.Router();
const jwt = require("jsonwebtoken");

let User = require("../models/user.model");

routes.route("/").post((req, res) => {
  let user = new User(req.body);

  const normalisedUsername = user.username.toLowerCase();

  User.findOne({ normalisedUsername }).then((resultUser, err) => {
    if (resultUser) {
      res.status(400).send("Registering user failed");
    } else {
      user.normalisedUsername = normalisedUsername;
      user.password = bcrypt.hashSync(user.password, saltRounds);

      user
        .save()
        .then(user => {
          res.status(201).json("user added successfully");
        })
        .catch(err => {
          res.status(400).send("adding new user failed");
        });
    }
  });
});

routes.route("/auth").get((req, res) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
  
    let decoded;
  
    try {
      if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }
  
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      res.status(400).send("Token not valid");
      return;
    }
  
    User.findOne({ normalisedUsername: decoded.normalisedUsername })
      .then((resultUser, err) => {
        if (resultUser) {
          res.json({
            id: resultUser._id,
            username: resultUser.username,
            email: resultUser.email,
            token
          });
        } else {
          res.status(400).send("Login attepted failed");
        }
      })
      .catch(err => console.log(err));
  });
  
  routes.route("/login").post((req, res) => {
    let user = req.body;
    
    const normalisedUsername = user.username.toLowerCase();
  
    User.findOne({ normalisedUsername })
      .then((resultUser, err) => {
        if (resultUser && bcrypt.compareSync(user.password, resultUser.password)) {
          const token = jwt.sign(
            { normalisedUsername },
            process.env.TOKEN_SECRET,
            {
              expiresIn: 86400 * process.env.TOKEN_EXPIRATION_DAYS
            }
          );
  
          res.json({
            id: resultUser._id,
            username: resultUser.username,
            email: resultUser.email,
            token
          });
        } else {
          res.status(400).send("Login attepted failed");
        }
      })
      .catch(err => console.log(err));
  });
  

module.exports = routes;
