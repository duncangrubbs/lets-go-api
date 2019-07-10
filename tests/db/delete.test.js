/**
 * @file delete.test.js
 * @description Test Suite, cruD.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

const assert = require('assert');
import User from '../../db/models/User';

describe('Deleting a User', () => {
  let user;

  beforeEach((done) => {
    user = new User({
      firstName: 'Duncan',
      lastName: 'Grubbs',
      birthdate: 938070000000,
      location: 'Rochester, NY',
      bio: 'Love the Outdoors!',
      email: 'duncan.grubbs@gmail.com',
      hash: '123456789',
      salt: '109271903',
    });
    user.save()
      .then((err) => { done() });
  });

  it('removes a user using its instance', (done) => {
    user.remove()
      .then(() => User.findOne({ firstName: 'Duncan' }))
      .then((pole) => {
        assert(pole === null);
        done();
      });
  });

  it('removes multiple users', (done) => {
    User.deleteOne({ firstName: 'Duncan' })
      .then(() => User.findOne({ firstName: 'Duncan' }))
      .then((pole) => {
        assert(pole === null);
        done();
      });
  });

  it('removes a user', (done) => {
    User.deleteOne({ firstName: 'Duncan' })
      .then(() => User.findOne({ firstName: 'Duncan' }))
      .then((pole) => {
        assert(pole === null);
        done();
      });
  });

  it('removes a user using id', (done) => {
    User.deleteOne({ _id: user._id })
    // the following code block is repeated again and again
      .then(() => User.findOne({ _id: user.id }))
      .then((pole) => {
        assert(pole === null);
        done();
      });
    // block end
  })
})