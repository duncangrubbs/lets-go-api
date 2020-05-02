/**
 * @file auth.js
 * @description Auth management.
 * @author Duncan Grubbs
 */

import jwt from 'express-jwt';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  SECRET_KEY,
  required: jwt({
    secret: SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
