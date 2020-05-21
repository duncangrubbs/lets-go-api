/**
 * @file app.js
 * @description Entry point for the express app.
 * @author Duncan Grubbs
 */

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';

import mongoDB from './db/mongoDB';
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

// Connect to the local, or cloud, database
mongoDB.connect();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 Routes are split by category, /auth handles
 all user related requests, /events handles
 almost everything else, all event related
 requests.
*/
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

/*
 Serve static documentation page on / endpoint.
 This was added to that users following links
 to the webiste will not get a 'route not found'.
*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
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
