import type { Player, Team } from "../types/updateState";
import Scoreboard from "./Scoreboard";
import Card from "./Card";

interface Props {
  players: Player[];
  teams: Team[];
}

const EndScoreboard: React.FC<Props> = ({ players, teams }) => {
  function getPlayersSpan() {
    return players.length === 6 ? "col-span-1" : "col-span-2";
  }

  function getPlayersCols() {
    return players.length === 6 ? "grid-cols-7" : "grid-cols-6";
  }

  interface PlayerProps {
    children: (p: Player) => React.ReactNode;
    team: number;
  }

  const Players: React.FC<PlayerProps> = ({ children, team }) => {
    return (
      <>{players.filter((p) => p.team === team).map((p) => children(p))}</>
    );
  };

  return (
    <div className="bg-neutral-900 w-screen h-screen overflow-hidden flex flex-col text-white text-2xl uppercase gap-y-8 p-4">
      <div className="flex justify-center w-full">
        <Scoreboard teams={teams} seconds={0} />
      </div>
      {/* Ligne */}

      <Row cols={`${getPlayersCols()} h-full flex items-center gap-x-4`}>
        <Card color={"blue"} className="w-full col-span-3 h-20">
          <div className="w-full grid grid-cols-3">
            <Players team={0}>
              {(p) => <div className="text-white text-center">{p.name}</div>}
            </Players>
          </div>
        </Card>
        <Card color="main" className="h-20">
          <div className={`${getPlayersSpan()} text-center mx-auto`}>
            Scoreboard
          </div>
        </Card>
        <Card color={"orange"} className="w-full col-span-3 h-20">
          <div className="w-full grid grid-cols-3">
            <Players team={1}>
              {(p) => <div className="text-white text-center">{p.name}</div>}
            </Players>
          </div>
        </Card>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.score}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Score</h2>
          <StatsBar keyStat={"score"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.score}</div>}
        </Players>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.goals}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Goals</h2>
          <StatsBar keyStat={"goals"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.goals}</div>}
        </Players>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.shots}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Tirs</h2>
          <StatsBar keyStat={"shots"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.shots}</div>}
        </Players>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.assists}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Assists</h2>
          <StatsBar keyStat={"assists"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.assists}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.saves}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Saves</h2>
          <StatsBar keyStat={"saves"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.saves}</div>}
        </Players>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.demos}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Demos</h2>
          <StatsBar keyStat={"demos"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.demos}</div>}
        </Players>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.touches}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} flex flex-col justify-center items-center gap-y-4`}
        >
          <h2 className="text-2xl font-semibold">Touches</h2>
          <StatsBar keyStat={"touches"} players={players} />
        </div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.touches}</div>}
        </Players>
      </Row>
    </div>
  );
};

interface RowProps {
  children: React.ReactNode;
  cols: string;
}
const Row: React.FC<RowProps> = ({ children, cols }) => {
  return <div className={`grid ${cols} w-full`}>{children}</div>;
};

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

export default EndScoreboard;
