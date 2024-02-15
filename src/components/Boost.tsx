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
        <img
          src="./boost-Gel.png"
          className={`absolute z-10 w-11/12 h-11/12 rounded-full flex items-center justify-center opacity-50`}
        />
        <div>
          <img
            src="./boost-Plein.png"
            className="w-full h-full -z-10 object-cover rounded-full"
            alt="background"
          />
        </div>
        <div
          className={`absolute bg-gradient-to-br ${colorClasses} w-4/6 h-4/6 rounded-full flex items-center blur-lg justify-center opacity-50`}
        />
        <span className="absolute text-white pt-7 font-bold text-4xl opacity-80">
          {player.boost}
        </span>
      </div>
    </>
  );
};

export default Boost;
