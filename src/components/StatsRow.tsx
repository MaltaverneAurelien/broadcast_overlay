import { Player } from "../types/updateState";
import getWidth from "../utils/getWidth";
import StatsBar from "./StatsBar";

interface Props {
  keyStat: keyof Omit<Player, "location">;
  players: Player[];
}

const StatsRow: React.FC<Props> = ({ keyStat, players }) => {
  interface PlayerProps {
    team: number;
  }

  const Players: React.FC<PlayerProps> = ({ team }) => {
    return (
      <>{players.filter((p) => p.team === team).map((p) => <div className={"text-white text-center " + getWidth(players)}>{p[keyStat]}</div>)}</>
    );
  };

  return (
    <div className="h-20 flex items-center gap-x-4 w-full">
      <div className="flex flex-grow h-full justify-around items-center px-3">
        <Players team={0} />
      </div>
      <div className="flex flex-col justify-center items-center gap-y-4 w-96 h-full px-3">
        <h2 className="text-2xl font-semibold uppercase">{keyStat}</h2>
        <StatsBar keyStat={"score"} players={players} />
      </div>
      <div className="flex flex-grow h-full justify-around px-3 items-center">
        <Players team={1}/>
      </div>
    </div>
  );
};

export default StatsRow;
