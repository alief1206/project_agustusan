const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { env } = require('./config/env');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');

const app = express();

app.use(helmet());
app.use(compression());
const allowedOrigins = [
  env.CLIENT_ORIGIN,
  'http://localhost:5173',
  'https://polling-penganjuran.vercel.app',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Polling Backend API Server is running' });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
