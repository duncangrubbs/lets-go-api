// delete_test.js
const assert = require('assert');
import User from '../db/models/User';

describe('Deleting a User', () => {
  let user;

  beforeEach((done) => {
    user = new User({
      name: 'Duncan Grubbs',
      birthdate: '01-09-1999',
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
      .then(() => User.findOne({ name: 'Duncan Grubbs' }))
      .then((pole) => {
        assert(pole === null);
        done();
      });
  });

  it('removes multiple users', (done) => {
    User.deleteOne({ name: 'Duncan Grubbs' })
      .then(() => User.findOne({ name: 'Duncan Grubbs' }))
      .then((pole) => {
        assert(pole === null);
        done();
      });
  });

  it('removes a user', (done) => {
    User.deleteOne({ name: 'Duncan Grubbs' })
      .then(() => User.findOne({ name: 'Duncan Grubbs' }))
      .then((pokemon) => {
        assert(pokemon === null);
        done();
      });
  });

  it('removes a user using id', (done) => {
    User.deleteOne({ _id: user._id })
    // the following code block is repeated again and again
      .then(() => User.findOne({ _id: user.id }))
      .then((pokemon) => {
        assert(pokemon === null);
        done();
      });
    // block end
  })
})