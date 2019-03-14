/**
 * @file auth.test.js
 * @description Test Suite, Auth routes.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// Configure chai
chai.use(chaiHttp);
chai.should();

const baseURL = '/api/auth';

describe('Auth Route Tests', () => {
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

  // signup route
  describe('POST /signup', () => {
    it('should return a status of 201', (done) => {
      chai.request(app)
        .post(`${baseURL}/signup`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

   // login route
  describe('POST /login', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .post(`${baseURL}/login`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
