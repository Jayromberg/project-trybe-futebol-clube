import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';
import { mockMatches, mockLeaderboardAway } from './utils'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rola /leaderboard/away', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(mockMatches as unknown as Match[]);
  });

  after(async () => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Resposta da rota /leaderboard/away em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboardAway);
  })
});
