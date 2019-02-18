/**
 * @file auth.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'AUTH OK' });
});

module.exports = router;
