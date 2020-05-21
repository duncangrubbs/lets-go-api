/**
 * @file mongoDB.js
 * @description Database connection wrapper class.
 * @author Duncan Grubbs
 */

import mongoose from 'mongoose';
import dbConfig from '../config/database';

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    // mongoose.set('debug', process.env.NODE_ENV !== 'production');
    mongoose.connect(
      dbConfig.development,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    );
    mongoose.connection
      .on('error', (error) => {
        console.warn('Error: ', error); // eslint-disable-line
      });
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
