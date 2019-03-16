/**
 * @file auth.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';

import User from '../db/models/User';
import auth from '../config/auth';

const router = express.Router();

/**
 * Validates that required fields for the User schema are defined.
 * @param {Object} user User to validate fields.
 * @returns {Boolean} TRUE if all fields are defined.
 */
function validateFieldsSignup(user) {
  if (!user) { return false; }
  if (!user.name
      || !user.password
      || !user.email) {
    return false;
  }
  return true;
}

// POST requests
router.post('/login', auth.optional, (req, res) => {
  res.status(200).json({ msg: 'LOGIN OK ' });
});

router.post('/signup', auth.optional, (req, res) => {
  const { body: { user } } = req;

  console.log(req.body); // eslint-disable-line

  if (!validateFieldsSignup(user)) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        name: 'is required',
        password: 'is required',
      },
    });
  }

  const finalUser = new User(user);
  // Hash and salt the password
  finalUser.setPassword(user.password);

  finalUser.save()
    .then(() => res.status(201).json({ user: finalUser.toAuthJSON() }));
});


// GET requests
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'AUTH OK' });
});

module.exports = router;
