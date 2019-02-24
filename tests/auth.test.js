// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Auth Tests', () => {
  describe('Route Ensure', () => {
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get('/api/auth/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /signup', () => {
    it('should return a status of 201', (done) => {
      chai.request(app)
        .post('/api/auth/signup')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
