process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV;
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHTTP);

describe('Client Routes', () => {

  it('should return homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });

  it('should return 404 for a route that does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/garage')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });


  

})
