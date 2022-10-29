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

describe('Teste de integração da rola /leaderboard/away', () => {
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
            inProgress: false,
            teamHome: {
              teamName: "São Paulo"
            },
            teamAway: {
              teamName: "Grêmio"
            }
          },
          {
            id: 2,
            homeTeam: 9,
            homeTeamGoals: 2,
            awayTeam: 14,
            awayTeamGoals: 0,
            inProgress: false,
            teamHome: {
              teamName: "São Paulo"
            },
            teamAway: {
              teamName: "Internacional"
            }
          },
          {
            id: 3,
            homeTeam: 4,
            homeTeamGoals: 3,
            awayTeam: 11,
            awayTeamGoals: 0,
            inProgress: false,
            teamHome: {
              teamName: "Corinthians"
            },
            teamAway: {
              teamName: "Napoli-SC"
            }
          },
          {
            id: 4,
            homeTeam: 3,
            homeTeamGoals: 0,
            awayTeam: 2,
            awayTeamGoals: 0,
            inProgress: false,
            teamHome: {
              teamName: "Botafogo"
            },
            teamAway: {
              teamName: "Bahia"
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

  it('Returno da rota /leaderboard/away em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/away')
    .set('Authorization', token)

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(
      [
        {
          name: 'Grêmio',
          totalPoints: 1,
          totalGames: 1,
          totalVictories: 0,
          totalDraws: 1,
          totalLosses: 0,
          goalsFavor: 1,
          goalsOwn: 1,
          goalsBalance: 0,
          efficiency: '33.33'
        },
        {
          name: 'Bahia',
          totalPoints: 1,
          totalGames: 1,
          totalVictories: 0,
          totalDraws: 1,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: '33.33'
        },
        {
          name: 'Internacional',
          totalPoints: 0,
          totalGames: 1,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 1,
          goalsFavor: 0,
          goalsOwn: 2,
          goalsBalance: -2,
          efficiency: '0.00'
        },
        {
          name: 'Napoli-SC',
          totalPoints: 0,
          totalGames: 1,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 1,
          goalsFavor: 0,
          goalsOwn: 3,
          goalsBalance: -3,
          efficiency: '0.00'
        }
      ]);
  })
});
