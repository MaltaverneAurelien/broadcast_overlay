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
          <Players players={players.filter((p) => p.team == 0)} color="blue" />
        </div>

        <Scoreboard teams={teams} seconds={seconds} />

        <div className="flex flex-col w-64 gap-y-2">
          <Players
            players={players.filter((p) => p.team == 1)}
            color="orange"
          />
        </div>
      </section>
    </main>
  );
}

interface Props {
  teams: Team[];
  seconds: number;
}

const Scoreboard: React.FC<Props> = ({ teams, seconds }) => {
  return (
    <div className="grid grid-cols-12 gap-x-4 w-[64rem]">
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="blue" className="w-full h-16">
          <p className="mx-auto text-2xl font-semibold">{teams[0]?.name}</p>
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
            <Card color="blue" className="w-full h-16">
              <span className="mx-auto font-bold text-2xl">
                {teams[0]?.score}
              </span>
            </Card>
          </div>
          <div className="col-span-2 h-16 flex">
            <Card color="main" className="w-full">
              <p className="mx-auto font-semibold text-2xl">
                {convertSeconds(seconds)}
              </p>
            </Card>
          </div>
          <div>
            <Card color="orange" className="w-full h-16">
              <span className="mx-auto font-bold text-xl">
                {teams[1]?.score}
              </span>
            </Card>
          </div>
        </div>
        <div>
          <Card color="main" className="w-full h-16">
            <p className="mx-auto font-semibold text-2xl">DoD Cup #29</p>
          </Card>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="orange" className="w-full h-16">
          <p className="mx-auto text-2xl font-semibold">{teams[1]?.name}</p>
        </Card>
        <div className="flex gap-x-1">
          <Card color="orange" filled={true} className="w-2/12 h-8" />
          <Card color="orange" className="w-2/12 h-8" />
          <Card color="orange" className="w-2/12 h-8" />
        </div>
      </div>
    </div>
  );
};
export default App;
