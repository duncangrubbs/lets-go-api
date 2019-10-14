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
import User from '../db/models/User';

// Configure chai
chai.use(chaiHttp);
chai.should();

const baseURL = `/api/${config.API_VERSION}/auth`;

describe('Auth Route Tests', () => {
  describe('Route Ensure', () => {
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

    it('should fail with no auth', (done) => {
      chai.request(app)
        .get(baseURL)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should return 200 and user', (done) => {
      sampleUser.save()
      .then((err) => {
        chai.request(app)
          .get(baseURL)
          .set('Authorization', `Token ${authToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });

  const signup_user = {
    email: "duncan@gmail.com",
    firstName: 'Duncan',
    lastName: 'Grubbs',
    password: 'password',
    birthdate: 938070000000,
  };

  const signup_user_bad = {
    email: "duncan@gmail.com",
    firstName: 'Duncan',
    lastName: 'Grubbs',
    birthdate: 938070000000,
  };

  describe('signup', () => {
    it('signup should return a status of 201', (done) => {
      chai.request(app)
        .post(`${baseURL}/signup`)
        .send({ user: signup_user }) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('signup with wrong info should return a status of 422', (done) => {
      chai.request(app)
        .post(`${baseURL}/signup`)
        .send({ user: signup_user_bad }) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('login', () => {
    // create mock user to test login
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

    const login_user_correct = {
      email: "duncan@gmail.com",
      password: 'password',
    };

    const login_user_incorrect_pass = {
      email: "duncan@gmail.com",
      password: 'wrong',
    };

    const login_user_incorrect_email = {
      email: "duncan.grubbs@gmail.com",
      password: 'password',
    };

    it('login should return a status of 200', (done) => {
      sampleUser.save()
      .then((err) => {
        chai.request(app)
        .post(`${baseURL}/login`)
        .set('content-type', 'application/json')
        .send({ user: login_user_correct })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      })
    });

    describe('Incorrect Logins', () => {
      it('login with wrong email should return a status of 410', (done) => {
        sampleUser.save()
        .then((err) => {
          chai.request(app)
          .post(`${baseURL}/login`)
          .set('content-type', 'application/json')
          .send({ user: login_user_incorrect_email })
          .end((err, res) => {
            res.should.have.status(410);
            res.body.should.be.a('object');
            done();
          });
        })
      });
  
      it('login with wrong password should return a status of 410', (done) => {
        sampleUser.save()
        .then((err) => {
          chai.request(app)
          .post(`${baseURL}/login`)
          .set('content-type', 'application/json')
          .send({ user: login_user_incorrect_pass })
          .end((err, res) => {
            res.should.have.status(410);
            res.body.should.be.a('object');
            done();
          });
        })
      });
    });
  });
});
