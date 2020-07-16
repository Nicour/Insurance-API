'use strict';

const chai = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiHttp);
chai.should();

const app = require('../app');
const agent = chai.request.agent(app);

describe("Test policies route", async () => {

  it('Successful get all policies', (done) => {
    agent
    .get('/policies')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array')
      expect(res.body[0]).to.have.all.keys('id', 'amountInsured', 'email', 'inceptionDate', 'installmentPayment', 'clientId')
      done();
    });
  });

});