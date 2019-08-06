/**
 * @file events.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs
 */

import express from 'express';
import Event from '../db/models/Event';

import auth from '../config/auth';

const router = express.Router();

const PER_PAGE_LIMIT = 40;

// POST requests
router.post('/create-event', auth.required, (req, res) => {
  const { body: { event: eventBlob } } = req;
  const event = new Event(eventBlob);
  event.save()
    .then(() => {
      res.status(201).json({ message: 'ADDED EVENT', event: eventBlob });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

// GET requests
router.get('/nearby/:radius', (req, res) => {
  res.status(200).json({ message: 'GET NEARBY EVENTS OK' });
});

router.get('/public/:page', (req, res) => {
  Event
    .find()
    .sort({ date: -1 })
    .limit(PER_PAGE_LIMIT)
    .exec((error, events) => {
      if (error) { res.status(400).json({ error }); }
      res.status(200).json({ events });
    });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'EVENTS OK' });
});

module.exports = router;
