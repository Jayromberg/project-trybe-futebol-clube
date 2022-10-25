import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';
import Team from '../database/models/Team.model'

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

    sinon
      .stub(Team, "findAll")
      .resolves([
        {
          id: 1,
          teamName: "Avaí/Kindermann"
        },
        {
          id: 2,
          teamName: "Bahia"
        }] as Team[],);

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
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Returno da rota /teams em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/teams')
    .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal([
      {
        id: 1,
        teamName: "Avaí/Kindermann"
      },
      {
        id: 2,
        teamName: "Bahia"
      }]);
  })
});
