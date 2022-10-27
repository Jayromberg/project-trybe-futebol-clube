export interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface IMatchResponse extends IMatch {
  id: number,
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }
}
