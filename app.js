/**
 * @file app.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';
import auth from './routes/auth';

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api/auth', auth);

// Catch-all
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

const server = app.listen(PORT, () => {
  console.log(`API app listening at port ${PORT}`);
});

module.exports = server;
