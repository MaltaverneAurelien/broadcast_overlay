import type Data from "./types";
import type Events from "./types/events";
import type GoalScoredData from "./types/goalScored";
import type UpdateStateData from "./types/updateState";
import type { Team, Player } from "./types/updateState";

import { useState, useEffect } from "react";

import init from "./lib/websocket";
import Players from "./components/Players";
import Scoreboard from "./components/Scoreboard";

import Card from "./components/Card";

type GameStatus = "playing" | "replay" | "ended";

import getColorClasses from "./utils/getColorClasses";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [targetPlayer, setTargetPlayer] = useState<Player | null>();
  const [gameStatus, setGameStatus] = useState<GameStatus>("ended");

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

  function getTeamColor(player: Player) {
    return player.team === 0 ? "blue" : "orange";
  }

  useEffect(() => init(events), []);

  // TODO: Creer un composant "EndScoreboard" qui contient les scores finaux
  // Le composant "EndScoreboard" doit avoir les props "teams", "players"
  // Si le status est === finis, alors cacher "main" et afficher "EndScoreboard"
  return (
    <>
    {/* Composant EndScoreboard */}
    {gameStatus === "ended" && (<>Finis</>)
    }
    {gameStatus !== "ended" && (
    <main className="w-screen h-screen flex flex-col pt-3 px-8 pb-8">
      <section className="flex justify-between">
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
      {gameStatus === "replay" && (
        // TODO: Recup stats du ballon
        <div>
          {/* Scorer */}
          {/* {players.find((p) => p.id == lastGoal.scorer.id).name} */}
          {/* lastGoal.scorer.teamNum */}
          {/* getTeamColor(players.find((p) => p.id == lastGoal.scorer.id)) */}
          {/* Assists */}
          {/* {players.find((p) => p.id == lastGoal.ball_last_touch.player).name} */}

          {/* TODO: utiliser Fontawesome pour les icones */}
        </div>
        )}

        {/* TODO: Mettre dans un composant, TargetPlayerFooter */}
      {targetPlayer && gameStatus === "playing" && (
        <section className="mt-auto flex w-full items-center">
          {/* Composants PlayerStats */}
          <div>
            <Card color={getTeamColor(targetPlayer)} className="w-56 h-12">
              <p className="text-xl font-bold mx-auto">{targetPlayer.name}</p>
            </Card>
            <Card color={getTeamColor(targetPlayer)} className="w-[36rem] h-20">
              <div className="w-full px-8 flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold opacity-80">Score</p>
                  <p className="text-lg font-bold">{targetPlayer.score}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold opacity-80">Goals</p>
                  <p className="text-lg font-bold">{targetPlayer.goals}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold opacity-80">Shots</p>
                  <p className="text-lg font-bold">{targetPlayer.shots}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold opacity-80">Assists</p>
                  <p className="text-lg font-bold">{targetPlayer.assists}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold opacity-80">Saves</p>
                  <p className="text-lg font-bold">{targetPlayer.saves}</p>
                </div>
              </div>
            </Card>
          </div>

        {/* Composant Boost */}
          <div className="relative ml-auto rounded-full w-48 h-48 flex items-center justify-center">
            <div
              className={`bg-neutral-900 w-full h-full rounded-full flex items-center justify-center blur`}
            >
              <div
                className={`bg-gradient-to-br ${getColorClasses(
                  getTeamColor(targetPlayer)
                )} w-2/4 h-2/4 rounded-full flex items-center blur-lg justify-center opacity-50`}
              />
            </div>

            <span className="absolute text-white font-bold text-4xl opacity-90">
              {targetPlayer.boost}
            </span>
          </div>
        </section>
      )}

      {/* TODO: Ajouter les stats du dernier but, si le status === "replay" */}
    </main>
    )}
    </>
  );
}

export default App;
