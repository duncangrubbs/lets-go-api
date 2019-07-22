/**
 * @file update.test.js
 * @description Test Suite, crUd.
 * @author Duncan Grubbs
 */

const assert = require('assert');
import User from '../../db/models/User';

describe('Updating a user', () => {
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
  
  function assertHelper(statement, done) {
    statement
     .then(() => User.find({}))
     .then((users) => {
      assert(users.length === 1);
      assert(users[0].firstName === 'Duncan');
      done();
    });
  }
  
  it('sets and saves user using an instance', (done) => {
    user.set('firstName', 'Duncan'); // not updated in mongodb yet
    assertHelper(user.save(), done);
   });
 
  it('update user using instance', (done) => {
    //useful to update multiple fields of the object
    assertHelper(user.updateOne({ firstName: 'Duncan' }), done);
  });

  it('update all matching user using model', (done) => {
    assertHelper(User.updateOne({ firstName: 'Duncan' }, { firstName: 'Duncan' }), done);
  });

  it('update one user using model', (done) => {
    assertHelper(User.findOneAndUpdate({ firstName: 'Duncan' }, { firstName: 'Duncan' }), done);
  });

  it('update one user with id using model', (done) => {
    assertHelper(User.findOneAndUpdate(user._id, { firstName: 'Duncan' }), done);
  });
});