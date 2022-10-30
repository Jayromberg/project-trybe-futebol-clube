import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rola /login/validate', () => {
  let chaiHttpResponse: Response;
  let token: string;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as User);
    
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

    token = chaiHttpResponse.body.token
  });

  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Returno da rota login/validate em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty("role")
    expect(chaiHttpResponse.body).to.deep.equal({ role: 'admin' });
  })

  it('Returna erro 400 em caso de ausência de token', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')


    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' });
  })

  it('Returna erro 401 no caso de token invalido', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', 'token_invalido')

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  })
})

describe('Teste de caso especifico da rola /login/validate', () => {
  let chaiHttpResponse: Response;
  let token: string;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .onFirstCall()
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as User)
      .onSecondCall()
      .resolves();
    
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

    token = chaiHttpResponse.body.token
  });

  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Returna erro 401 no caso de token corrompido', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  })
});