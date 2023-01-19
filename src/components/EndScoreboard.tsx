import type { Player } from "../types/updateState";
import Card from "./Card";

interface Props {
  players: Player[];
}

const EndScoreboard: React.FC<Props> = ({ players }) => {
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
    <div className="bg-neutral-900 w-screen h-screen overflow-hidden flex flex-col text-white text-2xl uppercase">
      {/* Ligne */}

      <Row cols={`${getPlayersCols()} h-full`}>
        <Card color={"blue"}>
          <Players team={0}>
            {(p) => <div className="text-white text-center">{p.name}</div>}
          </Players>
        </Card>
        <div className={`${getPlayersSpan()} text-center`}>Scoreboard</div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.name}</div>}
        </Players>
      </Row>

      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.score}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.score}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.goals}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.goals}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.shots}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.shots}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.assists}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.assists}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.saves}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.saves}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.demos}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
        <Players team={1}>
          {(p) => <div className="text-white text-center">{p.demos}</div>}
        </Players>
      </Row>
      <Row cols={`${getPlayersCols()} h-full`}>
        <Players team={0}>
          {(p) => <div className="text-white text-center">{p.touches}</div>}
        </Players>
        <div
          className={`${getPlayersSpan()} h-1.5 w-3/4 m-auto bg-white`}
        ></div>
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

export default EndScoreboard;
