import { useState, useEffect } from "react";
import type Data from "./types";
import type UpdateStateData from "./types/updateState";
import type { Team } from "./types/updateState";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [clock, setClock] = useState<number>(0)

  function updateState(data: Data<UpdateStateData>) {
    setTeams(data.data.game.teams);
    setClock(data.data.game.time_seconds)
  }

  const events: { [key: string]: (data: Data) => void } = {
    "game:update_state": updateState,
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:49122");

    ws.onmessage = (ev) => {
      const data: Data = JSON.parse(ev.data);
      const eventFunction = events[data.event];

      if (eventFunction) eventFunction(data);
    };

    return ws.close;
  }, []);

  return (
    <div>
      <p className="text-blue-500">{teams[0]?.name}</p>
      <p className="text-orange-500">{teams[1]?.name}</p>
      <h2>{}</h2>
      <p className="text-blue-500">{teams[0]?.score}</p>
      <p className="text-orange-500">{teams[1]?.score}</p>
    </div>
  );
}

export default App;
