/**
 * @file database.js
 * @description Config for database.
 * @author Duncan Grubbs
 */
require('dotenv').config();

const config = {
  development: 'mongodb://localhost/lets-go-db',
  production: process.env.MONGO_URL,
};

module.exports = config;
