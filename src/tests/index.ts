import Events from "../types/events";
import TestGame from "./Game";
import TestUpdateStateData from "./UpdateStateData";

export default function testMode(events: Events) {
  const game = new TestGame(2);

  const interval = setInterval(() => {
    game.randomUpdateState();

    events["game:update_state"]({
      event: "game:update_state",
      data: new TestUpdateStateData(game, game.playersToJSON()),
    });
  }, 1000 / 60);

  return () => clearInterval(interval);
}
