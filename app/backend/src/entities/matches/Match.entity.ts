import Scoreboard from './Scoreboard.entity';

export default class Match extends Scoreboard {
  private _homeTeam: number;
  private _awayTeam: number;

  constructor(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    super(homeTeamGoals, awayTeamGoals, true);
    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
  }

  public get homeTeam(): number {
    return this._homeTeam;
  }

  public get awayTeam(): number {
    return this._awayTeam;
  }
}
