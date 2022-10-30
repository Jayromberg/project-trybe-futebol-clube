import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

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

  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Resposta da rota login em casos de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty("token")
  });

  it('Resposta com erro 400 na ausência do email', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        password: 'secret_admin'
      });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  })

  it('Resposta com erro 400 na ausência do senha', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
      });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  })

  it('Resposta com erro 401 no caso de senha errada', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret1212212'
      });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  })
});

describe('Teste de caso especifico da rola /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves();
  });

  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Resposta com erro 401 no caso de email errado', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  })

  it('Resposta com erro 401 no caso de senha invalida', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'loren'
      });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Password validation failed' });
  })

  it('Resposta com erro 401 no caso de email invalida', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin',
        password: 'secret_admin'
      });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Email validation failed' });
  })
});

describe('Teste de caso especifico de erro desconhecido', () => {
  let chaiHttpResponse: Response;
  const error = new Error('Internal Error');
  before(async () => {
    sinon
      .stub(User, "findOne")
      .throws(error);  
    });

  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Resposta com erro 500 no caso erro desconhecido', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

    expect(chaiHttpResponse.status).to.equal(500);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Internal Error' });
  })
});
