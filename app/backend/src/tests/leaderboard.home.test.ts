import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';
import { mockMatches, mockLeaderboardHome } from './utils'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rola /leaderboard/home', () => {
  let chaiHttpResponse: Response;
  let token: string;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(mockMatches as unknown as Match[]);
  });

  after(async () => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Resposta da rota /leaderboard/home em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.equal(200);        
    expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboardHome);
  })
});
