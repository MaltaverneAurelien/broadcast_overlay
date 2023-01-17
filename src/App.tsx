import type Data from "./types";
import type Events from "./types/events";
import type GoalScoredData from "./types/goalScored";
import type UpdateStateData from "./types/updateState";
import type { Team, Player } from "./types/updateState";

import { useState, useEffect } from "react";

import init from "./lib/websocket";
import Players from "./components/Players";
import Scoreboard from "./components/Scoreboard";
import EndScoreboard from "./components/EndScoreboard";

import Card from "./components/Card";

type GameStatus = "playing" | "replay" | "ended";

import getColorClasses from "./utils/getColorClasses";
import getTeamColor from "./utils/getTeamColor";
import TargetPlayerFooter from "./components/TargetPlayerFooter";
import Boost from "./components/Boost";

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
    // "game:replay_will_end": replayWillEnd,
    "game:replay_end": replayEnd,
    "game:match_ended": matchEnded,
    "game:initialized": initialized,
  };

  function updateState(data: Data<UpdateStateData>) {
    setTeams(data.data.game.teams);
    setSeconds(data.data.game.time_seconds);
    // Object.values is used to convert an object to an array containing the values of the object
    setPlayers(Object.values(data.data.players));
    setTargetPlayer(data.data.players[data.data.game.target]);

    if (!data.data.game.isReplay) setGameStatus("playing");
    if (!data.data.hasGame || data.data.game.hasWinner) setGameStatus("ended");
  }

  function goalScored(data: Data<GoalScoredData>) {
    setLastGoal(data.data);
    // TODO: Lorsque le but est marqué, stocké dans une variable qui à marqué, la vitesse, et qui a fait la passe (si y'en a une)
    // Utilise l'intellisense pour voir les données disponibles
    // Ou le fichier types/goalScored.ts
    // Hesite pas a console.log
  }

  function replayStart(data: Data) {
    setGameStatus("replay");
  }
  // function replayWillEnd(data: Data) {}
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
      {gameStatus === "ended" && (
        <EndScoreboard teams={teams} players={players} />
      )}
      {gameStatus !== "ended" && (
        <main className="w-screen h-screen flex flex-col pt-3 px-8 pb-8">
          <section className="flex justify-between">
            <div className="flex flex-col w-64 gap-y-2">
              <Players
                players={players.filter((p) => p.team == 0)}
                color="blue"
              />
            </div>
            <Scoreboard teams={teams} seconds={seconds} />
            <div className="flex flex-col w-64 gap-y-2">
              <Players
                players={players.filter((p) => p.team == 1)}
                color="orange"
              />
            </div>
          </section>
          {gameStatus === "replay" && (
            // TODO: Recup stats du ballon
            <div>
              {/* Scorer */}

              <div>{lastGoal?.scorer.name}</div>

              {/* {players.find((p) => p.id == lastGoal.scorer.id).name} */}
              {/* lastGoal.scorer.teamNum */}
              {/* getTeamColor(players.find((p) => p.id == lastGoal.scorer.id)) */}
              {/* Assists */}
              {/* {players.find((p) => p.id == lastGoal.ball_last_touch.player).name} */}

              {lastGoal?.ball_last_touch !== undefined && (
                <>
                  <div>
                    {
                      players.find(
                        (p) => p.id == lastGoal?.ball_last_touch.player
                      )?.name
                    }
                  </div>
                </>
              )}

              {/* TODO: utiliser Fontawesome pour les icones */}
            </div>
          )}

          {targetPlayer && gameStatus === "playing" && (
            <TargetPlayerFooter player={targetPlayer} />
          )}
        </main>
      )}
    </>
  );
}

export default App;
