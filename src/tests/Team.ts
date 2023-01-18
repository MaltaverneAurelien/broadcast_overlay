import { Team } from "../types/updateState";
import TestGame from "./Game";
import TestPlayer from "./Player";
import { TEAM_NAMES } from "./utils";

class TestTeam {
  num: number;
  color_primary: string;
  color_secondary: string;
  name: string;
  score: number;
  players: TestPlayer[];
  game: TestGame;

  constructor(num: number, players: number, game: TestGame) {
    this.num = num;
    this.color_primary = "#000000";
    this.color_secondary = "#000000";
    this.name = TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)];
    this.score = 0;
    this.players = [];
    this.game = game;

    this.generatePlayers(players);
  }

  generatePlayers(number: number) {
    for (let i = 0; i < number; i++) {
      const player = new TestPlayer(this);
      this.players.push(player);
    }
  }

  randomUpdateState() {}

  toJSON(): Team {
    return {
      color_primary: this.color_primary,
      color_secondary: this.color_secondary,
      name: this.name,
      score: this.score,
    };
  }
}

export default TestTeam;
