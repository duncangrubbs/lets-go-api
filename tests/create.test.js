const assert = require('assert');
import User from '../db/models/User';

describe('Creating documents', () => {
  it('creates a user', (done) => {
    // assertion is not included in mocha so 
    // require assert which was installed along with mocha
    let sampleUser = new User({
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
        assert(!sampleUser.isNew);
        done();
      });
  });
});