require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV,
  dbHost: process.env.DB_HOST,
  serverPort: process.env.PORT
};

module.exports = config;
