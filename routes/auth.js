/**
 * @file auth.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';
import User from '../db/models/User';

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).json({ msg: 'LOGIN OK' });
});

router.post('/signup', (req, res) => {
  const dummy = new User({
    email: 'duncan@gmail.com',
    hash: '1234',
    salt: 'askfhksdf',
  });
  dummy.save()
    .then(() => {
      res.status(201).json({ msg: 'ADDED DUMMY USER' });
    });
});

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'AUTH OK' });
});

module.exports = router;
