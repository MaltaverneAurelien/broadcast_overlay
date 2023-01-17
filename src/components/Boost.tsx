import type { Player } from "../types/updateState";
import getTeamColor from "../utils/getTeamColor";
import getColorClasses from "../utils/getColorClasses";

interface Props {
  player: Player;
}

const Boost: React.FC<Props> = ({ player }) => {
  const colorClasses = getColorClasses(getTeamColor(player.team));

  return (
    <>
      <div className="relative ml-auto rounded-full w-48 h-48 flex items-center justify-center">
        <div
          className={`bg-gradient-to-tr ${colorClasses} p-1 w-full h-full rounded-full flex items-center justify-center`}
        >
          <img
            src="./background.png"
            className="w-full h-full object-cover rounded-full"
            alt="background"
          />
          <div
            className={`absolute bg-gradient-to-br ${colorClasses} w-4/6 h-4/6 rounded-full flex items-center blur-lg justify-center opacity-50`}
          />
        </div>

        <span className="absolute text-white font-bold text-4xl opacity-90">
          {player.boost}
        </span>
      </div>
    </>
  );
};

export default Boost;
