export default interface UpdateStateData {
  event: string;
  game: Game;
  hasGame: boolean;
  match_guid: string;
  players: Players;
}

export interface Game {
  arena: string;
  ball: Ball;
  hasTarget: boolean;
  hasWinner: boolean;
  isOT: boolean;
  isReplay: boolean;
  target: string;
  teams: Team[];
  time_milliseconds: number;
  time_seconds: number;
  winner: string;
}

export interface Ball {
  location: BallLocation;
  speed: number;
  team: number;
}

export interface BallLocation {
  X: number;
  Y: number;
  Z: number;
}

export interface Team {
  color_primary: string;
  color_secondary: string;
  name: string;
  score: number;
}

export interface Players {
  // key === ID of the player
  [key: string]: Player;
}

export interface Player {
  assists: number;
  attacker: string;
  boost: number;
  cartouches: number;
  demos: number;
  goals: number;
  hasCar: boolean;
  id: string;
  isDead: boolean;
  isPowersliding: boolean;
  isSonic: boolean;
  location: PlayerLocation;
  name: string;
  onGround: boolean;
  onWall: boolean;
  primaryID: string;
  saves: number;
  score: number;
  shortcut: number;
  shots: number;
  speed: number;
  team: number;
  touches: number;
}

export interface PlayerLocation {
  X: number;
  Y: number;
  Z: number;
  pitch: number;
  roll: number;
  yaw: number;
}
