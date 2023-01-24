import type { Team, Player } from "./types/updateState";
import type UpdateStateData from "./types/updateState";
import type GoalScoredData from "./types/goalScored";
import type Events from "./types/events";
import type Data from "./types";

import EndScoreboard from "./components/EndScoreboard";
import Main from "./components/Main";

import { useState, useEffect, useRef } from "react";

import GameStatus from "./types/gameStatus";
import init from "./lib/websocket";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [targetPlayer, setTargetPlayer] = useState<Player | null>();
  const [gameStatus, setGameStatus] = useState<GameStatus>("ended");
  const [lastGoal, setLastGoal] = useState<GoalScoredData>();

  // TODO: Voir comment fonctionne l'overtime, changer l'affichage du temps en fonction de l'overtime

  const events: Events = {
    "game:update_state": updateState,
    "game:goal_scored": goalScored,
    "game:replay_start": replayStart,
    "game:replay_end": replayEnd,
    "game:match_ended": matchEnded,
    "game:initialized": initialized,
  };

  function updateState(data: Data<UpdateStateData>) {
    if (!data.data.hasGame || data.data.game.hasWinner) {
      setGameStatus("ended");
      return;
    }

    setTeams(data.data.game.teams);
    setSeconds(data.data.game.time_seconds);
    // Object.values is used to convert an object to an array containing the values of the object
    setPlayers(Object.values(data.data.players));
    if (data.data.game.target === "" && !data.data.game.isReplay) {
      setTargetPlayer(null);
    }

    if (data.data.game.target !== "")
      setTargetPlayer(data.data.players[data.data.game.target]);

    if (data.data.game.isReplay) setGameStatus("replay");
    else setGameStatus("playing");
  }
  function goalScored(data: Data<GoalScoredData>) {
    setLastGoal(data.data);
  }
  function replayStart(data: Data) {
    setGameStatus("replay");
  }
  function replayEnd(data: Data) {
    setGameStatus("playing");
  }
  function matchEnded(data: Data) {
    setGameStatus("ended");
  }
  function initialized(data: Data) {
    setGameStatus("playing");
  }

  useEffect(() => init(events), []);

  return (
    <>
      {gameStatus !== "ended" && (
        <EndScoreboard players={players} teams={teams} />
      )}
      {/* {gameStatus !== "ended" && (
        <Main
          players={players}
          targetPlayer={targetPlayer}
          lastGoal={lastGoal}
          teams={teams}
          seconds={seconds}
          gameStatus={gameStatus}
        />
      )} */}
    </>
  );
}

export default App;
