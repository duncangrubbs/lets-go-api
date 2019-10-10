/**
 * @file events.test.js
 * @description Test Suite, Events routes.
 * @author Duncan Grubbs
 */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import config from '../config/config';

import User from '../db/models/User';
import Event from '../db/models/Event';

// Configure chai
chai.use(chaiHttp);
chai.should();

const baseURL = `/api/${config.API_VERSION}/events`;

describe('Events Route Tests', () => {
  describe('Route Ensure', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get(baseURL)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  const event = {
    title: "Test event",
    location: "San Anselmo",
    description: "Just a quick sesh",
    owner: "ashfasif783hfkjsdgn",
    date: 1563398240051
  };

  const sampleEvent = new Event({
    title: "Test event",
    location: "San Anselmo",
    description: "Just a quick sesh",
    owner: "ashfasif783hfkjsdgn",
    date: 1563398240051
  });

  const sampleEventID = sampleEvent._id;

  const sampleUser = new User({
    firstName: 'Duncan',
    lastName: 'Grubbs',
    password: 'password',
    birthdate: 938070000000,
    location: 'Rochester, NY',
    bio: 'Love the Outdoors!',
    email: 'duncan@gmail.com',
  });
  sampleUser.setPassword('password');

  const authToken = sampleUser.generateJWT();

  // create-event route
  describe('POST /create-event', () => {
    it('should return a status of 201', (done) => {
      sampleUser.save()
      .then((err) => {
        chai.request(app)
        .post(`${baseURL}/create-event`)
        .set('Authorization', `Token ${authToken}`)
        .send({ event })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
      })
    });
  });

  // create-event route
  describe('PUT /attend', () => {
    it('should return a status of 200', (done) => {
      sampleUser.save()
      .then(() => {
        sampleEvent.save()
        .then(() => {
          chai.request(app)
          .put(`${baseURL}/attend`)
          .set('Authorization', `Token ${authToken}`)
          .send({ eventID: sampleEventID })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
        })
      });
    });
  });

  // nearby route
  describe('GET /nearby', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get(`${baseURL}/nearby/3`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // public route
  describe('GET /public', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get(`${baseURL}/public/3`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
