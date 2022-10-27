import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';
import Match from '../database/models/Match.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rola POST /matches', () => {
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
      .stub(Match, "create")
      .resolves(
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: true,
        } as Match);

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
    (Match.create as sinon.SinonStub).restore();
  })

  it('Returno da rota POST /matches em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send({
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      })
      .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body).to.deep.equal(
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: true,
        });
  })

  it('Retorna o erro 422 ao tentar criar uma partida com times iguais', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send({
        homeTeam: 8,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      })
      .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(422);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" });
  })

  it('Returna erro 401 no caso de token invalido', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/matches')
    .send({
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
    })
    .set('Authorization', 'token_invalido')

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  })
});
