export default interface GoalScoredData {
    ball_last_touch: BallLastTouch;
    goalspeed:       number;
    impact_location: ImpactLocation;
    scorer:          Scorer;
}

export interface BallLastTouch {
    player: string;
    speed:  number;
}

export interface ImpactLocation {
    X: number;
    Y: number;
}

export interface Scorer {
    id:      string;
    name:    string;
    teamnum: number;
}
