export default abstract class Scoreboard {
  private _homeTeamGoals: number;
  private _awayTeamGoals: number;
  private _inProgress: boolean;

  constructor(homeTeamGoals: number, awayTeamGoals: number, inProgress: boolean) {
    this._homeTeamGoals = homeTeamGoals;
    this._awayTeamGoals = awayTeamGoals;
    this._inProgress = inProgress;
  }

  public get homeTeamGoals(): number {
    return this._homeTeamGoals;
  }

  public get awayTeamGoals(): number {
    return this._awayTeamGoals;
  }

  public get inProgress(): boolean {
    return this._inProgress;
  }
}
