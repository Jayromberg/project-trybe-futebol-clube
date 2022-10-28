// import { IMatchResponse } from '../../interfaces/match';
import FindAllMatchesService, { FindAllMatchesRepository } from '../matches/FindAllMatches.service';

export default class LeaderboardService extends FindAllMatchesService {
  private _matches: any[];
  private _inProgress: boolean;
  private _leaderboard: any[];

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

  private async findAllMatches() {
    this._matches = await super.findAll();
  }

  private filterInProgress() {
    this._matches = this._matches.filter((match) => match.inProgress === this._inProgress);
  }

  private leaderboardImplementation() {
    this._leaderboard = this._matches.reduce((acc, match) => {
      if (!acc.some((team: any) => match.teamHome.teamName === team.name)) {
        acc.push({
          name: match.teamHome.teamName,
          totalPoints: this.totalPointsImplementation(match),
          totalGames: this.totalGamesImplementation(match),
          totalVictories: this.totalVictoriesImplementation(match),
          totalDraws: this.totalDrawsImplementation(match),
          totalLosses: this.totalLossesImplementation(match),
          goalsFavor: this.goalsFavorImplementation(match),
          goalsOwn: this.goalsOwnImplementation(match),
          goalsBalance: this.goalsBalanceImplementation(match),
          efficiency: this.efficiencyImplementation(match),
        });
      }
      return acc;
    }, []);
  }

  private totalGamesImplementation({ homeTeam }: any): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.homeTeam === homeTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  private totalVictoriesImplementation({ homeTeam }: any) {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.homeTeamGoals > match.awayTeamGoals && match.homeTeam === homeTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  private totalDrawsImplementation({ homeTeam }: any) {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.homeTeamGoals === match.awayTeamGoals && match.homeTeam === homeTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  private totalLossesImplementation({ homeTeam }: any) {
    return this._matches.reduce((acc: any, match) => {
      let count = acc;
      if (match.homeTeamGoals < match.awayTeamGoals && match.homeTeam === homeTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  private goalsFavorImplementation({ homeTeam }: any) {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.homeTeam === homeTeam) {
        count += match.homeTeamGoals;
      }
      return count;
    }, 0);
  }

  private goalsOwnImplementation({ homeTeam }: any) {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.homeTeam === homeTeam) {
        count += match.awayTeamGoals;
      }
      return count;
    }, 0);
  }

  private goalsBalanceImplementation(match: any) {
    const goalsFavor = this.goalsFavorImplementation(match);
    const goalsOwn = this.goalsOwnImplementation(match);

    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  }

  private totalPointsImplementation(match: any) {
    const totalVictories = this.totalVictoriesImplementation(match);
    const totalDraws = this.totalDrawsImplementation(match);
    const totalLosses = this.totalLossesImplementation(match);

    const totalPoints = (totalVictories * 3) + totalDraws + (totalLosses * 0);
    return totalPoints;
  }

  private efficiencyImplementation(match: any) {
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
      const totalPointsA = a.totalVictories;
      const totalPointsB = b.totalVictories;
      if (totalPointsA > totalPointsB) {
        return -1;
      }
      if (totalPointsA < totalPointsB) {
        return 1;
      }
      return 0;
    });
  }

  private thirdOrder() {
    this._leaderboard.sort((a, b) => {
      const totalPointsA = a.goalsBalance;
      const totalPointsB = b.goalsBalance;
      if (totalPointsA > totalPointsB) {
        return -1;
      }
      if (totalPointsA < totalPointsB) {
        return 1;
      }
      return 0;
    });
  }

  private fourthOrder() {
    this._leaderboard.sort((a, b) => {
      const totalPointsA = a.goalsFavor;
      const totalPointsB = b.goalsFavor;
      if (totalPointsA > totalPointsB) {
        return -1;
      }
      if (totalPointsA < totalPointsB) {
        return 1;
      }
      return 0;
    });
  }

  private fifthOrder() {
    this._leaderboard.sort((a, b) => {
      const totalPointsA = a.goalsOwn;
      const totalPointsB = b.goalsOwn;
      if (totalPointsA > totalPointsB) {
        return -1;
      }
      if (totalPointsA < totalPointsB) {
        return 1;
      }
      return 0;
    });
  }
}
