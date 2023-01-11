import type Data from "./types";
import type Events from "./types/events";
import type UpdateStateData from "./types/updateState";
import type { Team, Player } from "./types/updateState";

import { useState, useEffect } from "react";

import convertSeconds from "./utils/convertSeconds";
import init from "./lib/websocket";

import Card from "./components/Card";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seconds, setSeconds] = useState<number>(0);

  const events: Events = {
    "game:update_state": updateState,
    "game:goal_scored": goalScored,
    "game:replay_start": replayStart,
    "game:replay_will_end": replayWillEnd,
    "game:replay_end": replayEnd,
    "game:match_ended": matchEnded,
  };

  function updateState(data: Data<UpdateStateData>) {
    setTeams(data.data.game.teams);
    setSeconds(data.data.game.time_seconds);
    setPlayers(Object.values(data.data.players));
  }

  function goalScored(data: Data) {}

  function replayStart(data: Data) {}
  function replayWillEnd(data: Data) {}
  function replayEnd(data: Data) {}

  function matchEnded(data: Data) {}

  useEffect(() => init(events), []);

  return (
    <div>
      <div className="w-screen px-28 flex justify-center">
        <Card color="blue" className="w-72 h-16">
          <p className="mx-auto">Hello</p>
        </Card>
        <Card color="main" className="w-72 h-16">
          <p className="mx-auto">Hello</p>
        </Card>
        <Card color="orange" className="w-72 h-16">
          <p className="mx-auto">Hello</p>
        </Card>
      </div>
      <p className="text-blue-600">{teams[0]?.name}</p>
      <p className="text-blue-500">{teams[0]?.score}</p>
      <div>
        {players
          .filter((p) => p.team === 0)
          .map((player) => (
            <PlayerStats key={player.name} player={player} />
          ))}
      </div>
      <h2 className="text-2xl font-bold">{convertSeconds(seconds)}</h2>
      <p className="text-orange-500">{teams[1]?.name}</p>
      <p className="text-orange-600">{teams[1]?.score}</p>
      {players
        .filter((p) => p.team === 1)
        .map((player) => (
          <PlayerStats key={player.name} player={player} />
        ))}
    </div>
  );
}

function PlayerStats({ player }: { player: Player }) {
  return (
    <div>
      <p>{player.name}</p>
      <p>Boost : {player.boost}</p>
      <p>Saves : {player.saves}</p>
      <p>Shots : {player.shots}</p>
      <p>Assists : {player.assists}</p>
      <p>Goals : {player.goals}</p>
      <p>Demos : {player.demos}</p>
      <p>Score : {player.score}</p>
      <p>Mort ? {player.isDead ? "Oui" : "Non"}</p>
    </div>
  );
}

function CssApp() {
  return (
    <div>
      <div className="w-screen px-28 flex justify-center h-14 gap-x-2">
        <Card color="blue" className="w-72">
          <p className="mx-auto">Team 1</p>
        </Card>
        <Card color="main" className="w-32">
          <p className="mx-auto">03:32</p>
        </Card>
        <Card color="orange" className="w-72">
          <p className="mx-auto">Team 2</p>
        </Card>
      </div>
      <div className="h-14 flex px-28 justify-center w-full mt-2">
        <Card color="main" className="w-7/12">
          <p className="mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta?</p>
        </Card>
      </div>
      <Card color="orange" filled={true} className="w-52 mt-10" />
      <Card color="orange" className="w-52 h-14">
        <p className="mx-auto">Hello</p>
      </Card>
    </div>
  );
}

export default CssApp;
