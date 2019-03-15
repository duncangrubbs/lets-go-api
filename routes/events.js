/**
 * @file events.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';
import Event from '../db/models/Event';

const router = express.Router();

// POST requests
router.post('/create-event', (req, res) => {
  const dummy = new Event({
    title: 'Swimming',
    location: 'San Anselmo',
    description: 'Just a quick sesh',
    owner: 'ashfasif783hfkjsdgn',
    date: Date.now() + 1000,
  });
  dummy.save()
    .then(() => {
      res.status(201).json({ msg: 'ADDED DUMMY EVENT' });
    });
});

// GET requests
router.get('/nearby/:radius', (req, res) => {
  res.status(200).json({ msg: 'GET NEARBY EVENTS OK' });
});

router.get('/public/:page', (req, res) => {
  res.status(200).json({ msg: 'GET ALL EVENTS OK' });
});

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'EVENTS ROUTER UP' });
});

module.exports = router;
