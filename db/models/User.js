/* eslint-disable func-names */
/**
 * @file User.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import mongoose from 'mongoose';
import crypto from 'crypto';

const User = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: String, required: true },
  location: { type: String, required: false },
  bio: { type: String, required: false },
  pastEvents: { type: Array, required: false },
  email: { type: String, required: true },
  hash: { type: String, default: null, required: true },
  salt: { type: String, default: null, required: true },
  dateCreated: { type: Number, default: Date.now() },
}, { collection: 'users' });

// Hashes and Salts the user's password
User.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// Validates an incomming password
User.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

export default mongoose.model('User', User);
