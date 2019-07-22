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

// Configure chai
chai.use(chaiHttp);
chai.should();

const baseURL = `/api/${config.API_VERSION}/events`;
const authToken = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bmNhbkBnbWFpbC5jb20iLCJpZCI6IjVkMmY4N2Q0ZDFmM2VkM2VhNDBjZDFkZSIsImV4cCI6MTU2ODU4MDgzOSwiaWF0IjoxNTYzMzk2ODM5fQ.kPxXblOecyFmCVdvzdVO0TVovUPaCbQpicU6W9QpXtk';

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

  // create-event route
  describe('POST /create-event', () => {
    it('should return a status of 201', (done) => {
      chai.request(app)
        .post(`${baseURL}/create-event`)
        .set('Authorization', authToken)
        .send({ event })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
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
