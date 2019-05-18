require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV,
  dbHost: process.env.DB_HOST,
  serverPort: process.env.PORT,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpirationDays: Number(process.env.TOKEN_EXPIRATION_DAYS),
  tokenSaltRounds: Number(process.env.TOKEN_SALT_ROUNDS)
};

module.exports = config;
