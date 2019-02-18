// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Students', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get all students record', (done) => {
      chai.request(app)
        .get('/api/auth')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
