/**
 * @file auth.js
 * @description All requests are sorted alphabetically and by type,
 * e.g. GET, POST, PUT
 * @author Duncan Grubbs
 */

import express from 'express';

import User from '../db/models/User';
import auth from '../config/auth';

const router = express.Router();
// 18 years = 569203200000 ms
const EIGHTEEN_YEARS = 569203200000;

/**
 * Validates that a user's age is at least 18
 * @param {Number} birthdate Birthdate in UNIX time
 */
function validateAge(birthdate) {
  if (birthdate + EIGHTEEN_YEARS <= Date.now()) { return true; }
  return false;
}

/**
 * Validates that required fields for the User schema are defined.
 * @param {Object} user User to validate fields.
 * @returns {Boolean} TRUE if all fields are defined.
 */
function validateFieldsSignup(user) {
  if (!user) { return false; }
  if (!user.firstName
      || !user.lastName
      || !user.password
      || !user.email) {
    return false;
  }
  if (!validateAge(user.birthdate)) { return false; }
  return true;
}

/**
 * @description Logs in a user
 * @access PUBLIC
 * @type POST
 */
function login(req, res) {
  const { body: { user } } = req;
  User.findOne({ email: user.email }, (err, response) => {
    if (!response) { return res.status(410).json({ error: 'Incorrect Email' }); }
    if (response.validatePassword(user.password)) {
      return res.status(200).json({ user: response.toAuthJSON() });
    }
    return res.status(400).json({ error: 'Incorrect Password' });
  });
}

/**
 * @description Signs up a user
 * @access PUBLIC
 * @type POST
 */
function signup(req, res) {
  const { body: { user } } = req;

  if (!validateFieldsSignup(user)) {
    return res.status(422).json({ error: 'Invalid Fields' });
  }

  User.findOne({ email: user.email }, (err, response) => {
    if (response) { res.status(409).json({ error: 'User Already Exists' }); }
    const finalUser = new User(user);
    // Hash and salt the password
    finalUser.setPassword(user.password);

    finalUser.save()
      .then(() => res.status(201).json({ user: finalUser.toAuthJSON() }));
  });
}

/**
 * @description GET /api/version/auth
 * @access PUBLIC
 * @type GET
 */
function main(req, res) {
  const { payload } = req;
  res.status(200).json({ message: 'AUTH OK', payload });
}

router.post('/login', auth.optional, login);
router.post('/signup', auth.optional, signup);

router.get('/', auth.required, main);

module.exports = router;
