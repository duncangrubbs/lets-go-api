/**
 * @file app.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';

import mongoose from 'mongoose';
import dbConfig from './db/config';

// API Routes
import auth from './routes/auth';

// Declare constants
const app = express();
const PORT = process.env.PORT || 5000;
// const isProduction = process.env.NODE_ENV === 'production';

// Configure Mongoose
mongoose.connect(dbConfig.url, { useNewUrlParser: true });
// mongoose.set('debug', true);

app.use('/api/auth', auth);

// Catch-all
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`API app listening at port ${PORT}`);
});

module.exports = server;
