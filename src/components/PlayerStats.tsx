import type { Player } from "../types/updateState";
import Card from "./Card";
import getTeamColor from "../utils/getTeamColor";

interface Props {
  player: Player;
}

const PlayerStats: React.FC<Props> = ({ player }) => {
  return (
    <>
      <div>
        <Card color={getTeamColor(player.team)} className="w-56 h-12 mb-1.5">
          <img
            src="./hiver_background_player_stats.png"
            className={`absolute top-0 w-full h-full `}
          />
          <p className="z-10 text-xl font-bold mx-auto overflow-hidden text-ellipsis whitespace-nowrap px-4">
            {player.name}
          </p>
        </Card>
        <Card color={getTeamColor(player.team)} className="w-[36rem] h-20">
          <img
            src="./hiver_background_score.png"
            className={`absolute top-0 right-0.5 w-full h-full opacity-80 `}
          />
          <div className="w-full px-8 flex items-center justify-between">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold opacity-80">Score</p>
              <p className="text-lg font-bold">{player.score}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold opacity-80">Goals</p>
              <p className="text-lg font-bold">{player.goals}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold opacity-80">Shots</p>
              <p className="text-lg font-bold">{player.shots}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold opacity-80">Assists</p>
              <p className="text-lg font-bold">{player.assists}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold opacity-80">Saves</p>
              <p className="text-lg font-bold">{player.saves}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default PlayerStats;
