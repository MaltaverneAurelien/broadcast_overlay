import type { Player, PlayerLocation } from "../types/updateState";

import TestTeam from "./Team";

import { PLAYER_NAMES } from "./utils";

class TestPlayer {
  name: string;
  id: string;
  primaryID: string;
  assists: number;
  attacker: string;
  boost: number;
  cartouches: number;
  demos: number;
  goals: number;
  hasCar: boolean;
  isDead: boolean;
  isPowersliding: boolean;
  isSonic: boolean;
  location: PlayerLocation;
  onGround: boolean;
  onWall: boolean;
  saves: number;
  score: number;
  shortcut: number;
  shots: number;
  speed: number;
  team: TestTeam;
  touches: number;

  constructor(team: TestTeam) {
    this.name = PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)];
    this.id = Math.floor(Math.random() * 1000000000).toString();
    this.primaryID = Math.floor(Math.random() * 1000000000).toString();
    this.assists = 0;
    this.attacker = "";
    this.boost = 33;
    this.cartouches = 0;
    this.demos = 0;
    this.goals = 0;
    this.hasCar = false;
    this.isDead = false;
    this.isPowersliding = false;
    this.isSonic = false;
    this.location = {
      X: 0,
      Y: 0,
      Z: 0,
      pitch: 0,
      roll: 0,
      yaw: 0,
    };
    this.onGround = false;
    this.onWall = false;
    this.saves = 0;
    this.score = 0;
    this.shortcut = 0;
    this.shots = 0;
    this.speed = 0;
    this.team = team;
    this.touches = 0;
  }

  randomUpdateState() {
    // Randomly update player score
    if (Math.random() < 0.005) this.score += Math.floor(Math.random() * 10);

    //  Randomly update player and teams goals
    if (Math.random() < 0.0005) {
      this.goals++;
      this.team.score++;
      this.team.game.isReplay = true;

      setTimeout(() => {
        this.team.game.isReplay = false;
      }, 10000);
    }

    // Randomly demo the player
    if (this.isDead === false && Math.random() < 0.00005) {
      this.isDead = true;

      setTimeout(() => {
        this.isDead = false;
      }, 3000);
    }

    // Randomly increment shots
    if (Math.random() < 0.0005) this.shots++;

    // Randomly increment assists
    if (Math.random() < 0.0005) this.assists++;

    // Randomly increment saves
    if (Math.random() < 0.0005) this.saves++;

    // Randomly increment touches
    if (Math.random() < 0.005) this.touches++;

    // Randomly increment boost by a number between 0 and 30
    if (Math.random() < 0.005)
      this.boost = Math.min(100, this.boost + Math.floor(Math.random() * 30));

    // Randomly decrement boost by a number between 0 and 30
    if (Math.random() < 0.005)
      this.boost = Math.max(0, this.boost - Math.floor(Math.random() * 30));
  }

  toJSON(): Player {
    return {
      name: this.name,
      id: this.id,
      primaryID: this.primaryID,
      assists: this.assists,
      attacker: this.attacker,
      boost: this.boost,
      cartouches: this.cartouches,
      demos: this.demos,
      goals: this.goals,
      hasCar: this.hasCar,
      isDead: this.isDead,
      isPowersliding: this.isPowersliding,
      isSonic: this.isSonic,
      location: this.location,
      onGround: this.onGround,
      onWall: this.onWall,
      saves: this.saves,
      score: this.score,
      shortcut: this.shortcut,
      shots: this.shots,
      speed: this.speed,
      team: this.team.num,
      touches: this.touches,
    };
  }
}

export default TestPlayer;
