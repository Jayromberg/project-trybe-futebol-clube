import { ILeaderboard } from '../../interfaces/leaderboard';
import { IMatchResponse } from '../../interfaces/match';
import { FindAllMatchesRepository } from '../matches/FindAllMatches.service';
import Leaderboard from '../../entities/leaderboard/Leaderboard';

export default class LeaderboardAway extends Leaderboard {
  constructor(repository: FindAllMatchesRepository) {
    super(repository, false);
  }

  leaderboardImplementation(): void {
    const leaderboard: ILeaderboard[] = [];

    this._matches.forEach((match: IMatchResponse) => {
      if (
        !leaderboard.some((teamHome: ILeaderboard) => match.teamAway?.teamName === teamHome.name)
      ) {
        leaderboard.push(
          this.leaderboardData(match),
        );
      }
    });

    this._leaderboard = leaderboard;
  }

  leaderboardData(match: IMatchResponse): ILeaderboard {
    const leaderboard = {
      name: match.teamAway?.teamName,
      totalPoints: this.totalPointsImplementation(match),
      totalGames: this.totalGamesImplementation(match),
      totalVictories: this.totalVictoriesImplementation(match),
      totalDraws: this.totalDrawsImplementation(match),
      totalLosses: this.totalLossesImplementation(match),
      goalsFavor: this.goalsFavorImplementation(match),
      goalsOwn: this.goalsOwnImplementation(match),
      goalsBalance: this.goalsBalanceImplementation(match),
      efficiency: this.efficiencyImplementation(match),
    };

    return leaderboard;
  }

  totalGamesImplementation({ awayTeam }: { awayTeam: number; }): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.awayTeam === awayTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  totalVictoriesImplementation({ awayTeam }: { awayTeam: number; }): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.awayTeamGoals > match.homeTeamGoals && match.awayTeam === awayTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  totalDrawsImplementation({ awayTeam }: { awayTeam: number; }): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.awayTeamGoals === match.homeTeamGoals && match.awayTeam === awayTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  totalLossesImplementation({ awayTeam }: { awayTeam: number; }): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.awayTeamGoals < match.homeTeamGoals && match.awayTeam === awayTeam) {
        count += 1;
      }
      return count;
    }, 0);
  }

  goalsFavorImplementation({ awayTeam }: { awayTeam: number; }): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.awayTeam === awayTeam) {
        count += match.awayTeamGoals;
      }
      return count;
    }, 0);
  }

  goalsOwnImplementation({ awayTeam }: { awayTeam: number; }): number {
    return this._matches.reduce((acc, match) => {
      let count = acc;
      if (match.awayTeam === awayTeam) {
        count += match.homeTeamGoals;
      }
      return count;
    }, 0);
  }
}
