import Events from "../types/events";
import { generateData, simulateEvent } from "./utils";

export default function testMode(events: Events) {
  let data = generateData(3);

  const start = Date.now();

  const interval = setInterval(() => {
    data = simulateEvent(data, start);

    events["game:update_state"](data);
  }, 1000 / 60);

  return () => clearInterval(interval);
}
