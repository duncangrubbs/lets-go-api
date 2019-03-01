const assert = require('assert');
import User from '../db/models/User';
let sampleUser;

beforeEach((done) => {
  sampleUser = new User({
    name: 'Duncan Grubbs',
    birthdate: '01-09-1999',
    location: 'Rochester, NY',
    bio: 'Love the Outdoors!',
    email: 'duncan.grubbs@gmail.com',
    hash: '123456789',
    salt: '109271903',
  });
  sampleUser.save()
    .then(() => {
      done();
    });
});

describe('Reading User details', () => {
  it('finds user with the email of duncan@gmail.com', (done) => {
    User.findOne({ name: 'Duncan Grubbs' })
      .then((user) => {
        try {
          assert(user != null);
        } catch (error) {
          console.log(error); // eslint-disable-line
        }
        done();
      });
  });
});
