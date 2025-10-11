export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  isLive: boolean;
  viewers: string;
  homeOdds?: number;
  drawOdds?: number;
  awayOdds?: number;
  league?: string;
  startTime?: string;
}

export interface ApiMatch {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  status: string;
  time: string;
  league: string;
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface ApiResponse {
  matches: ApiMatch[];
  status: string;
  timestamp: number;
}