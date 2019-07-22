/**
 * @file auth.test.js
 * @description Test Suite, Crud.
 * @author Duncan Grubbs
 */

const assert = require('assert');
import User from '../../db/models/User';

describe('Creating documents', () => {
  it('creates a user', (done) => {
    // assertion is not included in mocha so 
    // require assert which was installed along with mocha
    let sampleUser = new User({
      firstName: 'Duncan',
      lastName: 'Grubbs',
      password: 'something',
      birthdate: 938070000000,
      location: 'Rochester, NY',
      bio: 'Love the Outdoors!',
      email: 'duncan.grubbs@gmail.com',
    });
    sampleUser.save()
      .then((err) => {
        assert(!sampleUser.isNew);
        done();
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  });
});