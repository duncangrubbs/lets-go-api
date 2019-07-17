/**
 * @file events.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import express from 'express';
import Event from '../db/models/Event';

import auth from '../config/auth';

const router = express.Router();

// POST requests
router.post('/create-event', auth.required, (req, res) => {
  const { body: { event: eventBlob } } = req;
  const event = new Event(eventBlob);
  event.save()
    .then(() => {
      res.status(201).json({ message: 'ADDED EVENT', event: eventBlob });
    });
});

// GET requests
router.get('/nearby/:radius', (req, res) => {
  res.status(200).json({ message: 'GET NEARBY EVENTS OK' });
});

router.get('/public/:page', (req, res) => {
  res.status(200).json({ message: 'GET ALL EVENTS OK' });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'EVENTS ROUTER UP' });
});

module.exports = router;
