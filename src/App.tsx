import type Data from "./types";
import type Events from "./types/events";
import type GoalScoredData from "./types/goalScored";
import type UpdateStateData from "./types/updateState";
import type { Team, Player } from "./types/updateState";

import { useState, useEffect } from "react";

import init from "./lib/websocket";
import Players from "./components/Players";
import Scoreboard from "./components/Scoreboard";

type GameStatus = "playing" | "replay" | "ended";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [targetPlayer, setTargetPlayer] = useState<string>("");
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
    setTargetPlayer(data.data.game.target);
    // Utilise la méthode find sur players pour trouver le joueur qui a la balle
    // ex: players.find((p) => p.name === data.data.game.target)

    if (!data.data.game.isReplay) setGameStatus("playing");
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

  useEffect(() => init(events), []);

  // TODO: Creer un composant "EndScoreboard" qui contient les scores finaux
  // Le composant "EndScoreboard" doit avoir les props "teams", "players"
  // Si le status est === finis, alors cacher "main" et afficher "EndScoreboard"

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
      <section>
        <div>{targetPlayer}</div>
        {/* <div>{players.find((p) => p.name == targetPlayer)}</div> */}
      </section>
      {/* TODO: Ajouter les stats du joueur qui a le ballon si il y en a un*/}

      {/* TODO: Ajouter les stats du dernier but, si le status === "replay" */}
    </main>
  );
}

export default App;
