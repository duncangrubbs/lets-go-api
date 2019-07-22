/* eslint-disable func-names */
/**
 * @file User.js
 * @author Duncan Grubbs
 */

import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: { type: Number, required: true },

  username: { type: String, required: false },
  location: { type: String, required: false },
  bio: { type: String, required: false },
  pastEvents: { type: Array, required: false },

  hash: { type: String, default: null, required: false },
  salt: { type: String, default: null, required: false },
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

User.methods.generateJWT = function () {
  const today = new Date();
  const expDate = new Date(today);
  expDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expDate.getTime() / 1000, 10),
  }, auth.SECRET_KEY);
};

User.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

export default mongoose.model('User', User);
