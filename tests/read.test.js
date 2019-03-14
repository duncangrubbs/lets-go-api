const assert = require('assert');
import User from '../db/models/User';

describe('Reading User details', () => {
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

  it('finds user with the name of duncan grubbs', (done) => {
    User.findOne({ name: 'Duncan Grubbs' })
      .then((user) => {
        assert(user.name === 'Duncan Grubbs');
        done();
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  });
});
