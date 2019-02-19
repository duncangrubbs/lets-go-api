/**
 * @file User.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const User = new Schema({
  email: String,
  hash: String,
  salt: String,
});

// Hashes and Salts the user's password
User.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// Validates an incomming password
User.methods.validatePassword = (password) => {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

mongoose.model('users', User);
