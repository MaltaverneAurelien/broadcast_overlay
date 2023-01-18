import UpdateStateData, { Game, Players } from "../types/updateState";

class TestUpdateStateData {
  event: string;
  game: Game;
  hasGame: boolean;
  match_guid: string;
  players: Players;

  constructor(game: Game, players: Players) {
    this.event = "game:update_state";
    this.game = game;
    this.hasGame = true;
    this.match_guid = "test_uid";
    this.players = players;
  }

  toJSON(): UpdateStateData {
    return {
      event: this.event,
      game: this.game,
      hasGame: this.hasGame,
      match_guid: this.match_guid,
      players: this.players,
    };
  }
}

export default TestUpdateStateData;
