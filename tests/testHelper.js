/**
 * @file testHelper.js
 * @description Helper for test suite.
 * @author Duncan Grubbs
 */

import mongoDB from '../mongoDB';

// clear DB before running these test
before(() => { // eslint-disable-line
  mongoDB.connect();
});

beforeEach((done) => { // eslint-disable-line
  mongoDB.mongoose.connection.collections.users.drop(() => {
    // this function runs after the drop is completed
    done(); // go ahead everything is done now.
  });
});

after((done) => { // eslint-disable-line
  mongoDB.disconnect(done);
});
