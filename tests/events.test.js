/**
 * @file events.test.js
 * @description Test Suite, Events routes.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
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

  // create-event route
  describe('POST /create-event', () => {
    it('should return a status of 401', (done) => {
      chai.request(app)
        .post(`${baseURL}/create-event`)
        .end((err, res) => {
          res.should.have.status(401);
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
