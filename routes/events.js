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

/**
 * Removes expired or full capacity events.
 * @param {Array} events Array of events to validate.
 */
function excludeBadEvents(events) {
  const newEvents = [];
  events.forEach((event) => {
    if (!event.isExpired() && !event.isFull()) {
      newEvents.push(event);
    }
  });
  return newEvents;
}

// POST requests
/**
 * @description Saves a new event to the DB
 * @access Restricted
 */
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

// PUT requests
/**
 * @description Adds a user to the attendence list of an event
 * @access Restricted
 */
router.put('/attend', auth.required, (req, res) => {
  const { payload: { id } } = req;
  const { body: { eventID } } = req;
  Event.updateOne(
    { _id: eventID },
    { $push: { attendees: id } },
  )
    .then((error, blob) => {
      res.status(200).json({ message: 'ATTEND OK', data: blob });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// GET requests
/**
 * @description Returns list of events posted within
 * the given radius
 * @access Public
 */
router.get('/nearby/:radius', auth.optional, (req, res) => {
  res.status(200).json({ message: 'GET NEARBY EVENTS OK' });
});

/**
 * @description Returns list of public events for a given page
 * @access Restricted
 */
router.get('/public/:page', auth.required, (req, res) => {
  Event
    .find()
    .sort({ date: -1 })
    .limit(PER_PAGE_LIMIT)
    .exec((error, events) => {
      if (error) { res.status(400).json({ error }); }
      res.status(200).json({ events: excludeBadEvents(events) });
    });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'EVENTS OK' });
});

module.exports = router;
