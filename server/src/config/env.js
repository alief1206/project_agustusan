require('dotenv').config();

const env = {
  PORT: Number(process.env.PORT || 5000),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = { env };
