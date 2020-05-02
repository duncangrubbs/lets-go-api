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
import Event from '../db/models/Event';

// import all mocks
import {
  eventToSave,
  sampleEventNoOwner,
  sampleEventNoOwnerID,
  sampleEventValidOwner,
  sampleEventNearbyOne,
  sampleEventNearbyTwo,
  sampleEventNearbyOneID,
  sampleEventNearbyTwoID,
  sampleEventFar,
  sampleEventFarID,
} from './mocks/events';

import {
  sampleUserOne,
  authTokenUserOne,
  arbitraryToken,
} from './mocks/users';

// Configure chai
chai.use(chaiHttp);
chai.should();

const baseURL = `/api/${config.API_VERSION}/events`;

/*
 All of the tests for the /events/ API
 endpoint. This includes comprehensive
 testing for each endpoint, including a
 general route ensure.
*/

describe('Events Route Tests', () => {
  describe('Route Ensure', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get(baseURL)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // create-event route tests
  describe('POST /create-event', () => {
    it('should return a status of 201', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        console.log('two'); // eslint-disable-line
        chai.request(app)
        .post(`${baseURL}/create-event`)
        .set('Authorization', `Bearer ${authTokenUserOne}`)
        .send({ event: eventToSave })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          done();
        })
      })      
    });
  });

  // attend route tests
  describe('PUT /attend', () => {
    it('should return a status of 200', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        sampleEventNoOwner.isNew = true;
        sampleEventNoOwner.save()
        .then(() => {
          chai.request(app)
          .put(`${baseURL}/attend`)
          .set('Authorization', `Bearer ${authTokenUserOne}`)
          .send({ eventID: sampleEventNoOwnerID })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            done();
          });
        })
      });
    });
  });

  // edit route tests
  describe('PUT /edit', () => {
    it('should return a status of 200', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        eventToSave.owner = sampleUserOne._id;
        const newEvt = new Event(eventToSave);
        newEvt.save()
        .then(() => {
          chai.request(app)
          .put(`${baseURL}/edit`)
          .set('Authorization', `Bearer ${authTokenUserOne}`)
          .send({
            eventID: newEvt._id,
            fields: ['title', 'description'],
            values: ['new title', 'new desc']
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            done();
          });
        })
      });
    });

    it('should fail with bad fields/values', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        eventToSave.owner = sampleUserOne._id;
        const newEvt = new Event(eventToSave);
        newEvt.save()
        .then(() => {
          chai.request(app)
          .put(`${baseURL}/edit`)
          .set('Authorization', `Bearer ${authTokenUserOne}`)
          .send({
            eventID: newEvt._id,
            fields: ['wack'],
            values: ['new title', 'new desc']
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            done();
          });
        })
      });
    });
  });

  // nearby route tests
  describe('GET /nearby', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get(`${baseURL}/nearby/43.132615/-77.620166/2000`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  // delete route tests
  describe('DELETE /', () => {
    it('should error when not owner of event', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        sampleEventNoOwner.isNew = true;
        sampleEventNoOwner.save()
        .then(() => {
          chai.request(app)
          .delete(`${baseURL}`)
          .set('Authorization', `Bearer ${authTokenUserOne}`)
          .send({ eventID: sampleEventNoOwnerID })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            done();
          });
        })
      })
    });

    it('should return 204 on success', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        eventToSave.owner = sampleUserOne._id;
        const newEvt = Event(eventToSave);
        newEvt.save()
        .then(() => {
          chai.request(app)
          .delete(`${baseURL}`)
          .set('Authorization', `Bearer ${authTokenUserOne}`)
          .send({ eventID: newEvt._id })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            done();
          });
        })
      })
    });
  });

  // get attendees route tests
  describe('ATTENDEES /', () => {
    it('should return 200 on success', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        eventToSave.owner = sampleUserOne._id;
        const newEvt = Event(eventToSave);
        newEvt.save()
        .then(() => {
          chai.request(app)
          .get(`${baseURL}/attendees/${newEvt._id}`)
          .set('Authorization', `Bearer ${authTokenUserOne}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            done();
          });
        })
      })
    });

    it('should return 409 on failure', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        eventToSave.owner = sampleUserOne._id;
        const newEvt = Event(eventToSave);
        newEvt.save()
        .then(() => {
          chai.request(app)
          .get(`${baseURL}/attendees/${newEvt._id}`)
          .set('Authorization', `Bearer ${arbitraryToken}`)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            done();
          });
        })
      })
    });
  });

  // public route tests
  describe('GET /public', () => {
    it('should return a status of 200 with token', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        chai.request(app)
        .get(`${baseURL}/public/3`)
        .set('Authorization', `Bearer ${authTokenUserOne}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
      })
    });

    it('should return a status of 200 without token', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        chai.request(app)
        .get(`${baseURL}/public/3`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
      })
    });
  });

  describe('GET /search', () => {
    it('should return 200', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        chai.request(app)
        .get(`${baseURL}/search/Test_event`)
        .set('Authorization', `Bearer ${authTokenUserOne}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
      })
    });

    it('should return 404 with no query', (done) => {
      sampleUserOne.isNew = true;
      sampleUserOne.save()
      .then(() => {
        chai.request(app)
        .get(`${baseURL}/search`)
        .set('Authorization', `Bearer ${authTokenUserOne}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
      })
    });
  });
});
