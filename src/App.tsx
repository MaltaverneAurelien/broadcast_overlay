import type Data from "./types";
import type Events from "./types/events";
import type UpdateStateData from "./types/updateState";
import type { Team, Player } from "./types/updateState";

import { useState, useEffect } from "react";

import convertSeconds from "./utils/convertSeconds";
import init from "./lib/websocket";

import Card from "./components/Card";
import Players from "./components/Players";

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
    <main>
      <section className="flex justify-between p-3">
        <div className="flex flex-col w-64 gap-y-2">
          <Card color="orange" filled={false} className="h-[3.5rem]">
            <Players />
          </Card>
          <Card color="orange" filled={false} className="h-[3.5rem]">
            <p className="text-xl mx-auto">{players[1]?.name}</p>
            <p className="text-xl mx-auto">{players[1]?.boost}</p>
          </Card>
          <Card color="orange" filled={false} className="h-[3.5rem]" />
        </div>
        <div className="grid grid-cols-12 gap-x-4 w-[54rem]">
          <div className="col-span-4 flex flex-col gap-y-1">
            <Card color="blue" className="w-full h-12">
              <p className="mx-auto">{teams[0]?.name}</p>
            </Card>
            <div className="flex justify-end gap-x-1">
              <Card color="blue" className="w-2/12 h-8" />
              <Card color="blue" className="w-2/12 h-8" />
              <Card color="blue" filled={true} className="w-2/12 h-8" />
            </div>
          </div>
          <div className="col-span-4 flex flex-col w-full gap-y-2">
            <div className="grid grid-cols-4 gap-x-2">
              <div>
                <Card color="blue" className="w-full h-12">
                  <span className="mx-auto font-bold text-xl">
                    {teams[0]?.score}
                  </span>
                </Card>
              </div>
              <div className="col-span-2 h-12 flex">
                <Card color="main" className="w-full">
                  <p className="mx-auto font-semibold text-lg">
                    {convertSeconds(seconds)}
                  </p>
                </Card>
              </div>
              <div>
                <Card color="orange" className="w-full h-12">
                  <span className="mx-auto font-bold text-xl">
                    {teams[1]?.score}
                  </span>
                </Card>
              </div>
            </div>
            <div>
              <Card color="main" className="w-full h-12">
                <p className="mx-auto font-semibold text-xl">DoD Cup #29</p>
              </Card>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-y-1">
            <Card color="orange" className="w-full h-12">
              <p className="mx-auto">{teams[1]?.name}</p>
            </Card>
            <div className="flex gap-x-1">
              <Card color="orange" filled={true} className="w-2/12 h-8" />
              <Card color="orange" className="w-2/12 h-8" />
              <Card color="orange" className="w-2/12 h-8" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-64 gap-y-2">
          <Card color="blue" filled={false} className="h-[3.5rem]" />
          <Card color="blue" filled={false} className="h-[3.5rem]" />
          <Card color="blue" filled={false} className="h-[3.5rem]" />
        </div>
      </section>
      <section>
      {players
        .filter((p) => p.team === 1)
        .map((player) => (
          <PlayerStats key={player.name} player={player} />
        ))}
      </section>
    </main>
  );
}

function PlayerStats({ player }: { player: Player }) {
  return (
    <div className="bg-red-500">
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
      <div className="grid grid-cols-12 px-96 w-screen gap-x-4">
        <div className="col-span-4 flex flex-col gap-y-1">
          <Card color="blue" className="w-full h-12">
            <p className="mx-auto">Team 1</p>
          </Card>

          <div className="flex justify-end gap-x-1">
            <Card color="blue" className="w-2/12 h-8" />
            <Card color="blue" className="w-2/12 h-8" />
            <Card color="blue" filled={true} className="w-2/12 h-8" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col w-full gap-y-2">
          <div className="grid grid-cols-4 gap-x-2">
            <div>
              <Card color="blue" className="w-full h-12">
                <span className="mx-auto font-bold text-xl">4</span>
              </Card>
            </div>
            <div className="col-span-2 h-12 flex">
              <Card color="main" className="w-full">
                <p className="mx-auto font-semibold text-lg">03:32</p>
              </Card>
            </div>
            <div>
              <Card color="orange" className="w-full h-12">
                <span className="mx-auto font-bold text-xl">0</span>
              </Card>
            </div>
          </div>
          <div>
            <Card color="main" className="w-full h-12">
              <p className="mx-auto font-semibold text-xl">DoD Cup #34</p>
            </Card>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-y-1">
          <Card color="orange" className="w-full h-12">
            <p className="mx-auto">Team 2</p>
          </Card>
          <div className="flex gap-x-1">
            <Card color="orange" filled={true} className="w-2/12 h-8" />
            <Card color="orange" className="w-2/12 h-8" />
            <Card color="orange" className="w-2/12 h-8" />
          </div>
        </div>
      </div>
      {/* <Card color="orange" filled={true} className="w-52 mt-10" />
      <Card color="orange" className="w-52 h-14">
        <p className="mx-auto">Hello</p>
      </Card> */}
    </div>
  );
}

export default App;
