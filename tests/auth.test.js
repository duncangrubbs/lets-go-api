/**
 * @file auth.test.js
 * @description Test Suite, Auth routes.
 * @author Duncan Grubbs
 */

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import config from '../config/config';

import {
  sampleUserOne,
  authTokenUserOne,
  signupUserOne,
  signupUserOneBad,
  loginUserCorrect,
  loginUserIncorrectPass,
  loginUserIncorrectEmail,
} from './mocks/users';

// Configure chai
chai.use(chaiHttp);
chai.should();

const baseURL = `/api/${config.API_VERSION}/auth`;

describe('Auth Route Tests', () => {
  describe('Route Ensure', () => {
    it('should fail with no auth', (done) => {
      chai.request(app)
        .get(baseURL)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('should return 200 and user', (done) => {
      sampleUserOne.save()
      .then((err) => {
        chai.request(app)
          .get(baseURL)
          .set('Authorization', `Token ${authTokenUserOne}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      })
    });
  });

  describe('signup', () => {
    it('signup should return a status of 201', (done) => {
      chai.request(app)
        .post(`${baseURL}/signup`)
        .send({ user: signupUserOne })
        .set('accept', 'json')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          done();
        });
    });

    it('signup with wrong info should return a status of 422', (done) => {
      chai.request(app)
        .post(`${baseURL}/signup`)
        .send({ user: signupUserOneBad })
        .set('accept', 'json')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  // TODO: fix this test
  describe('login', () => {
    it('login should return a status of 410', (done) => {
      sampleUserOne.save()
      .then(() => {
        chai.request(app)
          .post(`${baseURL}/login`)
          .set('content-type', 'application/json')
          .send({ user: loginUserCorrect })
          .end((err, res) => {
            res.should.have.status(410);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
        });
      })
    });

    describe('Incorrect Logins', () => {
      it('login with wrong email should return a status of 410', (done) => {
        sampleUserOne.save()
        .then(() => {
          chai.request(app)
            .post(`${baseURL}/login`)
            .set('content-type', 'application/json')
            .send({ user: loginUserIncorrectEmail })
            .end((err, res) => {
              res.should.have.status(410);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
        })
      });
  
      it('login with wrong password should return a status of 410', (done) => {
        sampleUserOne.save()
        .then(() => {
          chai.request(app)
            .post(`${baseURL}/login`)
            .set('content-type', 'application/json')
            .send({ user: loginUserIncorrectPass })
            .end((err, res) => {
              res.should.have.status(410);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
        })
      });
    });
  });

  describe('Edit Profile Fields', (done) => {
    it('should succefully update fields', (done) => {
      sampleUserOne.save()
      .then(() => {
        chai.request(app)
          .put(`${baseURL}/update`)
          .set('content-type', 'application/json')
          .set('Authorization', `Token ${authTokenUserOne}`)
          .send({
            fields: ['email', 'firstName'],
            values: ['new email', 'new name']
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          })
      })
    });
  });
});
