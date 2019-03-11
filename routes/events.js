/**
 * @file events.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';
import User from '../db/models/User';
import Event from '../db/models/Event';

const router = express.Router();

// POST requests
router.post('/events/create-event', (req, res) => {
  res.status(200).json({ msg: 'CREATE EVENT OK' });
});

// GET requests
router.get('/events/nearby/:radius', (req, res) => {
  res.status(200).json({ msg: 'GET NEARBY EVENTS OK' });
});

router.get('/events/public/:page', (req, res) => {
  res.status(200).json({ msg: 'GET ALL EVENTS OK' });
});

module.exports = router;
