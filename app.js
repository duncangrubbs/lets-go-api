/**
 * @file app.js
 * @description Entry point for the express app.
 * @author Duncan Grubbs
 */

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import mongoDB from './mongoDB';
import config from './config/config';

// API Routes
import auth from './routes/auth';
import events from './routes/events';

require('dotenv').config();

// Declare constants
const app = express();
const PORT = process.env.PORT || 5000;

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(logger('tiny'));
}

// Configure Mongoose
mongoDB.connect();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes, split by topic
app.use(`/api/${config.API_VERSION}/auth`, auth);
app.use(`/api/${config.API_VERSION}/events`, events);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      success: false,
      message: 'Bad/no token provided.',
    });
  }
  return next();
});

// Catch-all
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`API listening at port ${PORT}`); // eslint-disable-line
});

module.exports = server;
