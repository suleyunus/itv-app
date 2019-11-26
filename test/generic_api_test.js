// eslint-disable-next-line no-unused-vars
const chaiHttp = require('chai-http');

const chai = require('chai');

const { expect } = chai;

const app = require('../app');

describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  });
});
