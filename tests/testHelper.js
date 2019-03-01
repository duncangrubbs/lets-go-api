import mongoose from 'mongoose';

import dbConfig from '../db/config';

// tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true });
mongoose.connection
  .on('error', (error) => {
    console.warn('Error : ', error); // eslint-disable-line
  });

// Called hooks which runs before something.
beforeEach((done) => { // eslint-disable-line
  mongoose.connection.collections.users.drop(() => {
    // this function runs after the drop is completed
    done(); // go ahead everything is done now.
  });
});
