const jwt = require("jsonwebtoken");

const config = require("../config");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.tokenSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = { checkToken };
