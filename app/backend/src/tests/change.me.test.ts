import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Integração', () => {
  describe('Teste de integração da rola /login', () => {  
    let chaiHttpResponse: Response;
  
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
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorno em casos de sucesso', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });
   
      expect(chaiHttpResponse.status).to.equal(200);
    });

    it('Retorna erro 400 na ausência do email', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        password: 'secret_admin'
      });
      
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })

    it('Retorna erro 400 na ausência do senha', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
      });
      
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })
  });
}); 
