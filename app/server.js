/**
 * @file server.js
 * @author Duncan Grubbs
 */

const express = require('express');

const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`);
});

module.exports = server;
