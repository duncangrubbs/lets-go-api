/**
 * @file Event.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Number, default: Date.now() },
});

export default mongoose.model('events', Event);
