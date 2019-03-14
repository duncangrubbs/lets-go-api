/**
 * @file update.test.js
 * @description Test Suite, crUd.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

const assert = require('assert');
import User from '../db/models/User';

describe('Updating a user', () => {
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
  
  function assertHelper(statement, done) {
    statement
     .then(() => User.find({}))
     .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Duncan Grubbs');
      done();
    });
  }
  
  it('sets and saves user using an instance', (done) => {
    user.set('name', 'Duncan Grubbs'); // not updated in mongodb yet
    assertHelper(user.save(), done);
   });
 
  it('update user using instance', (done) => {
    //useful to update multiple fields of the object
    assertHelper(user.updateOne({ name: 'Duncan Grubbs' }), done);
  });

  it('update all matching user using model', (done) => {
    assertHelper(User.updateOne({ name: 'Duncan Grubbs' }, { name: 'Duncan Grubbs' }), done);
  });

  it('update one user using model', (done) => {
    assertHelper(User.findOneAndUpdate({ name: 'Duncan Grubbs' }, { name: 'Duncan Grubbs' }), done);
  });

  it('update one user with id using model', (done) => {
    assertHelper(User.findOneAndUpdate(user._id, { name: 'Duncan Grubbs' }), done);
  });
});