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

describe('Teste de integração da rola /matches?inProgress=true', () => {
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
      .stub(Match, "findAll")
      .resolves([
          {
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 1,
            awayTeam: 8,
            awayTeamGoals: 1,
            inProgress: true,
            teamHome: {
              teamName: "São Paulo"
            },
            teamAway: {
              teamName: "Grêmio"
            }
          },
          {
            id: 2,
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeam: 9,
            awayTeamGoals: 0,
            inProgress: true,
            teamHome: {
              teamName: "São Paulo"
            },
            teamAway: {
              teamName: "Internacional"
            }
          },
        ] as unknown as Match[]);

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
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Resposta da rota /matches?inProgress=true em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matches?inProgress=true')
    .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(
      [
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: true,
          teamHome: {
            teamName: "São Paulo"
          },
          teamAway: {
            teamName: "Grêmio"
          }
        },
        {
          id: 2,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 9,
          awayTeamGoals: 0,
          inProgress: true,
          teamHome: {
            teamName: "São Paulo"
          },
          teamAway: {
            teamName: "Internacional"
          }
        },
      ]);
  })
});
