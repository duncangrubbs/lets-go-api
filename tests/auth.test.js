/**
 * @file auth.test.js
 * @description Test Suite, Auth routes.
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

const baseURL = `/api/${config.API_VERSION}/auth`;

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

  const user = {
    email: "duncan@gmail.com",
    firstName: 'Duncan',
    lastName: 'Grubbs',
    password: 'test',
    birthdate: 938070000000,
  };

  const login_user = {
    email: "duncan@gmail.com",
    password: 'test',
  };

  describe('signup and login', () => {
    it('signup should return a status of 201', (done) => {
      chai.request(app)
        .post(`${baseURL}/signup`)
        .send({ user }) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('login should return a status of 200', (done) => {
      chai.request(app)
        .post(`${baseURL}/login`)
        .set('content-type', 'application/json')
        .send({ user: login_user })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
