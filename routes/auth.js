/**
 * @file auth.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).json({ msg: 'LOGIN OK' });
});

router.get('/signup', (req, res) => {
  res.status(200).json({ msg: 'SIGNUP OK' });
});

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'AUTH OK' });
});

module.exports = router;
