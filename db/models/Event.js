/* eslint-disable func-names */
/**
 * @file Event.js
 * @author Duncan Grubbs
 */

import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  location:    {
    latitude:  { type: String, required: true },
    longitude: { type: String, required: true },
  },
  owner:       { type: String, required: true },

  capacity:    { type: Number, required: true, default: 2 },
  attendees:   { type: Array, required: false, default: [] },

  date:        { type: Number, required: true },
  dateCreated: { type: Number, default: Date.now() },
}, { collection: 'events' });

Event.methods.isExpired = function () {
  return Date.now() >= this.date;
};

Event.methods.isFull = function () {
  return this.attendees.length + 1 === this.capacity;
};

export default mongoose.model('Event', Event);
