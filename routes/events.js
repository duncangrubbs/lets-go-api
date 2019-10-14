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

/**
 * @description Saves a new event to the DB
 * @access RESTRICTED
 * @type POST
 */
function createEvent(req, res) {
  const { body: { event: eventBlob } } = req;
  const event = new Event(eventBlob);
  event.save()
    .then(() => {
      res.status(201).json({ message: 'ADDED EVENT', event: eventBlob });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
}

/**
 * @description Adds a user to the attendence list of an event
 * @access RESTRICTED
 * @type PUT
 */
function attend(req, res) {
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
}

/**
 * @description Returns list of events posted within
 * the given radius
 * @access PUBLIC
 * @type GET
 */
function nearby(req, res) {
  res.status(200).json({ message: 'GET NEARBY EVENTS OK' });
}

/**
 * @description Returns list of public events for a given page
 * @access Restricted
 * @type GET
 */
function publicEvents(req, res) {
  Event
    .find()
    .sort({ date: -1 })
    .limit(PER_PAGE_LIMIT)
    .exec((error, events) => {
      if (error) { res.status(400).json({ error }); }
      res.status(200).json({ events: excludeBadEvents(events) });
    });
}

/**
 * @description GET /api/version/events
 * @access PUBLIC
 * @type GET
 */
function main(req, res) {
  res.status(200).json({ message: 'EVENTS OK' });
}

router.post('/create-event', auth.required, createEvent);

router.put('/attend', auth.required, attend);

router.get('/nearby/:radius', auth.optional, nearby);
router.get('/public/:page', auth.required, publicEvents);
router.get('/', auth.optional, main);

module.exports = router;
