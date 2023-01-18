import { Ball, Game, Players } from "../types/updateState";
import TestPlayer from "./Player";
import TestTeam from "./Team";

class TestGame {
  arena: string;
  ball: Ball;
  hasTarget: boolean;
  hasWinner: boolean;
  isOT: boolean;
  isReplay: boolean;
  target: string;
  teams: TestTeam[];
  time_milliseconds: number;
  time_seconds: number;
  winner: string;
  players: TestPlayer[];
  start: number;

  constructor(players: number) {
    this.ball = {
      location: {
        X: 0,
        Y: 0,
        Z: 0,
      },
      speed: 0,
      team: 0,
    };

    this.teams = [
      new TestTeam(0, players, this),
      new TestTeam(1, players, this),
    ];
    this.players = this.teams.reduce((acc: TestPlayer[], team) => {
      return [...acc, ...team.players];
    }, []);
    this.hasTarget = true;
    this.hasWinner = false;
    this.arena = "Beckwith Park";
    this.isOT = false;
    this.isReplay = false;
    this.target = this.players[0]?.id || "";
    this.time_milliseconds = 0;
    this.time_seconds = 0;
    this.winner = "";
    this.start = new Date().getTime();
  }

  randomUpdateState() {
    if (this.isReplay) return;

    const time = 300000 - (new Date().getTime() - this.start);

    this.time_milliseconds = time;
    this.time_seconds = Math.round(time / 1000);

    if (time <= 0) {
      // Just restart the timer for now
      this.start = new Date().getTime();
    }

    if (Math.random() < 0.005) {
      this.target =
        this.players[Math.floor(Math.random() * this.players.length)].id;
    }

    this.players.forEach((player) => player.randomUpdateState());
  }

  playersToJSON(): Players {
    const players: Players = {};

    this.players.forEach((player) => {
      players[player.id] = player.toJSON();
    });

    return players;
  }

  toJSON(): Game {
    return {
      arena: this.arena,
      ball: this.ball,
      hasTarget: this.hasTarget,
      hasWinner: this.hasWinner,
      isOT: this.isOT,
      isReplay: this.isReplay,
      target: this.target,
      teams: this.teams.map((team) => team.toJSON()),
      time_milliseconds: this.time_milliseconds,
      time_seconds: this.time_seconds,
      winner: this.winner,
    };
  }
}

export default TestGame;
