import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";

import config from "..";

const checkToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token = (req.headers["x-access-token"] ||
    req.headers.authorization) as string;

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    if (!config.tokenSecret) {
      console.log("Token secret not found");
      return;
    }

    jwt.verify(token, config.tokenSecret, (err: any, decoded: any) => {
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

export default { checkToken };

