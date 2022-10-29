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

  abstract totalGamesImplementation({ homeTeam }: { homeTeam: number }): number;

  abstract totalVictoriesImplementation({ homeTeam }: { homeTeam: number }):number;

  abstract totalDrawsImplementation({ homeTeam }: { homeTeam: number }): number;

  abstract totalLossesImplementation({ homeTeam }: { homeTeam: number }): number;

  abstract goalsFavorImplementation({ homeTeam }: { homeTeam: number }): number;

  abstract goalsOwnImplementation({ homeTeam }: { homeTeam: number }): number;

  abstract goalsBalanceImplementation(match: IMatchResponse): number;

  abstract totalPointsImplementation(match: IMatchResponse): number;

  abstract efficiencyImplementation(match: IMatchResponse): string;

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
