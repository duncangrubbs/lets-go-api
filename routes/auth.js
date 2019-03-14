/**
 * @file auth.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';
import User from '../db/models/User';

const router = express.Router();

// POST requests
router.post('/signup', (req, res) => {
  const dummy = new User({
    name: 'Duncan Grubbs',
    birthdate: '01-09-1999',
    location: 'Rochester, NY',
    bio: 'Love the Outdoors!',
    email: 'duncan.grubbs@gmail.com',
  });
  dummy.setPassword('demopassword');
  dummy.save()
    .then(() => {
      res.status(201).json({ msg: 'ADDED DUMMY USER' });
    });
});

router.post('/login', (req, res) => {
  res.status(200).json({ msg: 'LOGIN OK' });
});

// GET requests
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'AUTH OK' });
});

module.exports = router;
