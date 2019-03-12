/* aeslint-disable func-names */
/**
 * @file Event.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
  attendees: { type: Array, required: true, default: [] },
  date: { type: Number, required: true },
  dateCreated: { type: Number, required: true, default: Date.now() },
}, { collection: 'events' });

Event.methods.isExpired = function () {
  return Date.now() >= this.date();
};

export default mongoose.model('Event', Event);
