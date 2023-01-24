import type { Team, Player } from "./types/updateState";
import type UpdateStateData from "./types/updateState";
import type GoalScoredData from "./types/goalScored";
import type Events from "./types/events";
import type Data from "./types";
import type BestOf from "./types/bestOf";

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
  const [bestOf, setBestOf] = useState<BestOf>(null);
  const [gamesWon, setGamesWon] = useState<number[]>([0, 0]);

  // TODO: Voir comment fonctionne l'overtime, changer l'affichage du temps en fonction de l'overtime

  const events: Events = {
    "game:update_state": updateState,
    "game:goal_scored": goalScored,
    "game:replay_start": replayStart,
    "game:replay_end": replayEnd,
    "game:match_ended": matchEnded,
    "game:initialized": initialized,
  };

  const keyEvents: { [key: string]: () => void } = {
    r: () => setGamesWon([0, 0]),
    a: () => handleWin(0),
    z: () => handleWin(1),
    "&": () => setBestOf(null),
    é: () => setBestOf(3),
    '"': () => setBestOf(5),
    "'": () => setBestOf(7),
  };

  function updateState(data: Data<UpdateStateData>) {
    if (!data.data.hasGame || data.data.game.hasWinner) {
      if (data.data.game.hasWinner && gameStatus !== "ended" && bestOf !== null) {
        handleWin(data.data.game.teams.findIndex((t) => t.name === data.data.game.winner) as 0 | 1);
      }
      setGameStatus("ended");
      return;
    }

    if (gameStatus === "ended" && bestOf !== null) {
      if (
        gamesWon.some((g) => {
          if (bestOf === 3) return g >= 2;

          if (bestOf === 5) return g >= 3;

          if (bestOf === 7) return g >= 5;
        })
      ) {
        console.log("BO FINIS");

        setGamesWon([0, 0]);
      }
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

  function handleWin(team: 0 | 1) {
    setGamesWon((gamesWon) => gamesWon.map((g, i) => {
      if (i === team) return g + 1;
      return g;
    }));
  } 

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (Object.keys(keyEvents).includes(key)) keyEvents[key]();
  }

  useEffect(() => init(events), []);
  useEffect(() => {
    document.onkeydown = handleKeyDown;

    return () => {
      document.onkeydown = null;
    };
  }, []);

  return (
    <>
      {gameStatus === "ended" && (
        <EndScoreboard
          players={players}
          teams={teams}
          bestOf={bestOf}
          gamesWon={gamesWon}
        />
      )}
      {gameStatus !== "ended" && (
        <Main
          players={players}
          targetPlayer={targetPlayer}
          lastGoal={lastGoal}
          teams={teams}
          seconds={seconds}
          gameStatus={gameStatus}
          bestOf={bestOf}
          gamesWon={gamesWon}
        />
      )}
    </>
  );
}

export default App;
