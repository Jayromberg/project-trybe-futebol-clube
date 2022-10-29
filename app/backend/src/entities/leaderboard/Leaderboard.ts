import { ILeaderboard } from '../../interfaces/leaderboard';
import { IMatchResponse } from '../../interfaces/match';
import FindAllMatchesService, { FindAllMatchesRepository }
  from '../../services/matches/FindAllMatches.service';

export default abstract class Leaderboard extends FindAllMatchesService {
  protected _matches: IMatchResponse[];
  private _inProgress: boolean;
  protected _leaderboard: ILeaderboard[];

  constructor(repository: FindAllMatchesRepository, inProgress: boolean) {
    super(repository);
    this._inProgress = inProgress;
  }

  async leaderboard() {
    await this.findAllMatches();
    this.filterInProgress();
    this.leaderboardImplementation();
    this.fifthOrder();
    this.fourthOrder();
    this.thirdOrder();
    this.secondOrder();
    this.firstOrder();
    return this._leaderboard;
  }

  async findAllMatches() {
    this._matches = await super.findAll();
  }

  private filterInProgress() {
    this._matches = this._matches.filter((match) => match.inProgress === this._inProgress);
  }

  abstract leaderboardImplementation(): void;

  abstract leaderboardData(match: IMatchResponse): ILeaderboard;

  abstract totalGamesImplementation(match: IMatchResponse): number;

  abstract totalVictoriesImplementation(match: IMatchResponse):number;

  abstract totalDrawsImplementation(match: IMatchResponse): number;

  abstract totalLossesImplementation(match: IMatchResponse): number;

  abstract goalsFavorImplementation(match: IMatchResponse): number;

  abstract goalsOwnImplementation(match: IMatchResponse): number;

  protected goalsBalanceImplementation(match: IMatchResponse): number {
    const goalsFavor = this.goalsFavorImplementation(match);
    const goalsOwn = this.goalsOwnImplementation(match);

    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  }

  protected totalPointsImplementation(match: IMatchResponse): number {
    const totalVictories = this.totalVictoriesImplementation(match);
    const totalDraws = this.totalDrawsImplementation(match);
    const totalLosses = this.totalLossesImplementation(match);

    const totalPoints = (totalVictories * 3) + totalDraws + (totalLosses * 0);
    return totalPoints;
  }

  protected efficiencyImplementation(match: IMatchResponse): string {
    const totalPoints = this.totalPointsImplementation(match);
    const totalGames = this.totalGamesImplementation(match);

    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  }

  private firstOrder() {
    this._leaderboard.sort((a, b) => {
      const totalPointsA = a.totalPoints;
      const totalPointsB = b.totalPoints;
      if (totalPointsA > totalPointsB) {
        return -1;
      }
      if (totalPointsA < totalPointsB) {
        return 1;
      }
      return 0;
    });
  }

  private secondOrder() {
    this._leaderboard.sort((a, b) => {
      const totalVictoriesA = a.totalVictories;
      const totalVictoriesB = b.totalVictories;
      if (totalVictoriesA > totalVictoriesB) {
        return -1;
      }
      if (totalVictoriesA < totalVictoriesB) {
        return 1;
      }
      return 0;
    });
  }

  private thirdOrder() {
    this._leaderboard.sort((a, b) => {
      const goalsBalanceA = a.goalsBalance;
      const goalsBalanceB = b.goalsBalance;
      if (goalsBalanceA > goalsBalanceB) {
        return -1;
      }
      if (goalsBalanceA < goalsBalanceB) {
        return 1;
      }
      return 0;
    });
  }

  private fourthOrder() {
    this._leaderboard.sort((a, b) => {
      const goalsFavorA = a.goalsFavor;
      const goalsFavorB = b.goalsFavor;
      if (goalsFavorA > goalsFavorB) {
        return -1;
      }
      if (goalsFavorA < goalsFavorB) {
        return 1;
      }
      return 0;
    });
  }

  private fifthOrder() {
    this._leaderboard.sort((a, b) => {
      const goalsOwnA = a.goalsOwn;
      const goalsOwnB = b.goalsOwn;
      if (goalsOwnA > goalsOwnB) {
        return -1;
      }
      if (goalsOwnA < goalsOwnB) {
        return 1;
      }
      return 0;
    });
  }
}
