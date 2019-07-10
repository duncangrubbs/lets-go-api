/**
 * @file auth.test.js
 * @description Test Suite, cRud.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

const assert = require('assert');
import User from '../../db/models/User';

describe('Reading User details', () => {
  let sampleUser;
  beforeEach((done) => {
    sampleUser = new User({
      firstName: 'Duncan',
      lastName: 'Grubbs',
      birthdate: 938070000000,
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

  it('finds user with the name of Duncan', (done) => {
    User.findOne({ firstName: 'Duncan' })
      .then((user) => {
        assert(user.firstName === 'Duncan');
        done();
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  });
});
