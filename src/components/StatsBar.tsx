import { Player } from "../types/updateState";

interface StatsBarProps {
  keyStat: keyof Player;
  players: Player[];
}

const StatsBar: React.FC<StatsBarProps> = ({ keyStat, players }) => {
  function sumStat(teamNum: 0 | 1, key: keyof Player) {
    return players
      .filter((p) => p.team === teamNum)
      .map((p) => p[key])
      .reduce((val: number, curr: any) => val + curr, 0);
  }

  function getStatPercentage(teamNum: 0 | 1, key: keyof Player) {
    const teamStats = [sumStat(0, key), sumStat(1, key)];

    const sumTotal = teamStats.reduce(
      (val: number, curr: any) => val + curr,
      0
    );

    return Math.round((teamStats[teamNum] / sumTotal) * 100);
  }

  return (
    <div className="w-3/4 flex rounded overflow-hidden">
      <div
        className={`h-1.5 m-auto bg-gradient-to-l to-blue-600 from-green-600`}
        style={{
          width: `${getStatPercentage(0, keyStat)}%`,
        }}
      />
      <div
        className={`h-1.5 m-auto bg-gradient-to-r to-orange-600 from-red-600`}
        style={{
          width: `${getStatPercentage(1, keyStat)}%`,
        }}
      />
    </div>
  );
};

export default StatsBar;
