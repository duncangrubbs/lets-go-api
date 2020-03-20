/**
 * @file events.js
 * @description All requests are sorted alphabetically, and by type.
 * @author Duncan Grubbs
 */

import express from 'express';
import Event from '../db/models/Event';

import auth from '../config/auth';
import { isInRadius } from '../helpers/LocationHelper';
import { validateEventFAV } from '../helpers/ValidationHelper';

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
  const { payload: { id } } = req;
  const { body: { event: eventBlob } } = req;

  eventBlob.owner = id;
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
 * @description Deleted event from DB
 * @access RESTRICTED
 * @type DELETE
 */
function deleteEvent(req, res) {
  const { body: { eventID } } = req;
  const { payload: { id } } = req;

  Event.deleteOne({
    $and: [
      { _id: eventID },
      { owner: id },
    ],
  }, (_, info) => {
    if (info.deletedCount === 0) { return res.status(400).json({ message: 'Not Deleted' }); }
    return res.status(200).json({ message: `Deleted Event ${eventID}` });
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

function edit(req, res) {
  const { payload: { id } } = req;
  const { body: { eventID: _id } } = req;
  const { body: { fields } } = req;
  const { body: { values } } = req;

  if (!validateEventFAV(fields, values)) {
    return res.status(400).json({ message: 'Invalid Fields/Values' });
  }

  const updatedInfo = {};

  for (let i = 0; i < fields.length; i += 1) {
    updatedInfo[fields[i]] = values[i];
  }

  Event.findOne({ _id }, (error, event) => {
    if (error) { return res.status(400).json({ message: error }); }
    if (event.owner === id) {
      Event.updateOne(
        { _id },
        { $set: updatedInfo },
      )
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch(err => res.status(400).json({ message: err }));
    } else {
      return res.status(400).json({ message: 'Not Event Owner' });
    }
  });
}

/**
 * @description Returns list of attendees of
 * a given event
 * @access RESTRICTED
 * @type GET
 */
function attendees(req, res) {
  const { params: { id: eid } } = req;
  const { payload: { id: uid } } = req;

  Event
    .findOne({ _id: eid })
    .exec((error, event) => {
      const { owner } = event;
      const { attendees: attns } = event;

      if (error) { return res.status(400).json({ message: error }); }
      if (owner !== uid) { return res.status(409).json({ message: 'Not Authorized User' }); }

      return res.status(200).json({ data: attns });
    });
}

/**
 * @description Returns list of events posted within
 * the given radius
 * @access PUBLIC
 * @type GET
 */
function nearby(req, res) {
  const { params: { lat } } = req;
  const { params: { long } } = req;
  const { params: { radius } } = req;

  Event
    .find()
    .sort({ date: -1 })
    .exec((error, events) => {
      if (error) { res.status(400).json({ error }); }
      let eventsToReturn = [];
      events.forEach((event) => {
        const { location: { latitude } } = event;
        const { location: { longitude } } = event;
        const inRadius = isInRadius(
          parseFloat(lat),
          parseFloat(long),
          parseInt(radius, 10),
          parseFloat(latitude),
          parseFloat(longitude),
        );
        if (inRadius) {
          eventsToReturn.push(event);
        }
      });
      eventsToReturn = eventsToReturn.slice(0, PER_PAGE_LIMIT);
      res.status(200).json({ data: excludeBadEvents(eventsToReturn) });
    });
}

/**
 * @description Returns list of public events for a given page
 * @access RESTRICTED
 * @type GET
 */
function publicEvents(req, res) {
  const { params: { page } } = req;
  Event
    .find()
    .sort({ date: -1 })
    .skip(page * PER_PAGE_LIMIT)
    .limit(PER_PAGE_LIMIT)
    .exec((error, events) => {
      if (error) { res.status(400).json({ error }); }
      res.status(200).json({ data: excludeBadEvents(events) });
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
router.put('/edit', auth.required, edit);

router.delete('/', auth.required, deleteEvent);

router.get('/attendees/:id', auth.required, attendees);
router.get('/nearby/:lat/:long/:radius', auth.optional, nearby);
router.get('/public/:page', auth.optional, publicEvents);

router.get('/', auth.optional, main);

module.exports = router;
