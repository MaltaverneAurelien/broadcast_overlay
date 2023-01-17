export default interface GoalScoredData {
  ball_last_touch: BallLastTouch;
  goalspeed: number;
  impact_location: ImpactLocation;
  scorer: Scorer;
  assister: Assister;
  goaltime: number
}

export interface Assister {
  id: string;
  name: string;
}
export interface BallLastTouch {
  player: string;
  speed: number;
}

export interface ImpactLocation {
  X: number;
  Y: number;
}

export interface Scorer {
  id: string;
  name: string;
  teamnum: number;
}
