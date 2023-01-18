import type Data from "./types";
import type Events from "./types/events";
import type GoalScoredData from "./types/goalScored";
import type UpdateStateData from "./types/updateState";
import type { Team, Player } from "./types/updateState";

import { useState, useEffect, useRef } from "react";

import init from "./lib/websocket";
import Players from "./components/Players";
import Scoreboard from "./components/Scoreboard";
import EndScoreboard from "./components/EndScoreboard";

import Card from "./components/Card";

type GameStatus = "playing" | "replay" | "ended";

import convertSeconds from "./utils/convertSeconds";

import getTeamColor from "./utils/getTeamColor";
import TargetPlayerFooter from "./components/TargetPlayerFooter";

import {
  faMeteor,
  faStopwatch,
  faUsers,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Transition } from "react-transition-group";

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
    setTeams(data.data.game.teams);
    setSeconds(data.data.game.time_seconds);
    // Object.values is used to convert an object to an array containing the values of the object
    setPlayers(Object.values(data.data.players));
    setTargetPlayer(data.data.players[data.data.game.target]);

    if (data.data.game.isReplay) setGameStatus("replay");
    else setGameStatus("playing");

    if (!data.data.hasGame || data.data.game.hasWinner) setGameStatus("ended");
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
      {gameStatus === "ended" && (
        <EndScoreboard teams={teams} players={players} />
      )}
      {gameStatus !== "ended" && (
        // Component Playing
        <main className="w-screen h-screen flex flex-col pt-3 px-5 pb-5">
          <section className="flex justify-between">
            <div className="flex flex-col w-64 gap-y-2">
              <Players
                players={players.filter((p) => p.team == 0)}
                color="blue"
                target={targetPlayer?.id || ""}
              />
            </div>
            <Scoreboard teams={teams} seconds={seconds} />
            <div className="flex flex-col w-64 gap-y-2">
              <Players
                players={players.filter((p) => p.team == 1)}
                color="orange"
                target={targetPlayer?.id || ""}
              />
            </div>
          </section>

          <Transition
            in={gameStatus === "replay" && lastGoal ? true : false}
            timeout={500}
          >
            {/* Faire de la section un composant ReplayStats */}
            {/* Voir le composant TargetPlayerFooter pour un exemple avec le state */}
            {(state) => (
              <section
                className={`mt-auto flex flex-col w-full items-center mb-20 transition-all duration-300 ${
                  state === "entered" ? "opacity-100" : "opacity-0"
                }`}
              >
                <Card
                  color={getTeamColor(lastGoal?.scorer.teamnum || 0)}
                  className="w-[38rem] h-24"
                >
                  <div className="w-full flex justify-around px-12 items-center pt-1">
                    <div className="flex flex-col items-center gap-y-1.5">
                      <FontAwesomeIcon icon={faCrown} className="w-8 h-8" />
                      <span
                        className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          maxWidth:
                            lastGoal?.assister.name !== "" ? "8rem" : "12rem",
                        }}
                      >
                        {lastGoal?.scorer.name}
                      </span>
                    </div>

                    {lastGoal?.assister.name !== "" && (
                      <div className="flex flex-col items-center gap-y-1.5">
                        <FontAwesomeIcon icon={faUsers} className="w-8 h-8 " />
                        <span className="font-semibold max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
                          {lastGoal?.assister.name}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-y-1.5">
                      <FontAwesomeIcon icon={faMeteor} className="w-8 h-8" />
                      <span className="font-semibold">
                        {Math.floor(lastGoal?.goalspeed || 0)} km/h
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-y-1.5">
                      <FontAwesomeIcon icon={faStopwatch} className="w-8 h-8" />
                      <span className="font-semibold">
                        {convertSeconds(lastGoal?.goaltime || 0)}
                      </span>
                    </div>
                  </div>
                </Card>
              </section>
            )}
          </Transition>

          <Transition in={gameStatus === "replay" ? true : false} timeout={500}>
            {/* Faire de la div un composant ReplayFooter */}
            {/* Voir le composant TargetPlayerFooter pour un exemple avec le state */}
            {(state) => (
              <div
                className={`absolute bottom-0 left-0 right-0 h-16 bg-neutral-900 flex justify-center items-center bg-opacity-95 gap-x-4 transition-all duration-300 ${
                  state === "entered" ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-red-600 w-6 h-6 rounded-full animate-pulse" />
                <h1 className="text-white text-2xl font-bold uppercase">
                  Replay
                </h1>
              </div>
            )}
          </Transition>

          <Transition
            in={targetPlayer && gameStatus === "playing" ? true : false}
            timeout={500}
          >
            {(state) => (
              <TargetPlayerFooter
                state={state}
                player={targetPlayer as Player}
              />
            )}
          </Transition>
        </main>
      )}
    </>
  );
}

export default App;
