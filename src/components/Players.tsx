import type Data from "../types";
import type Events from "../types/events";
import type UpdateStateData from "../types/updateState";
import type { Player } from "../types/updateState";

import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Players: React.FC<Props> = ({ children, className }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const events: Events = {
    "game:update_state": updateState,
  };

  function updateState(data: Data<UpdateStateData>) {
    setPlayers(Object.values(data.data.players));
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

  return (
    <div>
      <div className="bg-red-500">
        {players
          .filter((p) => p.team === 0)
          .map((player) => (
            <PlayerStats key={player.name} player={player} />
          ))}
      </div>
      <div>
        {players
          .filter((p) => p.team === 1)
          .map((player) => (
            <PlayerStats key={player.name} player={player} />
          ))}
      </div>
    </div>
  );
};

export default Players;
