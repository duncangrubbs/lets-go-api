/**
 * @file testHelper.js
 * @description Helper for test suite.
 * @author Duncan Grubbs
 */

import mongoDB from '../db/mongoDB';

before(() => {
  mongoDB.connect();
});

beforeEach((done) => {
  mongoDB.mongoose.connection.collections.users.drop(() => {
    mongoDB.mongoose.connection.collections.events.drop(() => {
      done();
    });
  });
});

after((done) => {
  mongoDB.disconnect(done);
});
