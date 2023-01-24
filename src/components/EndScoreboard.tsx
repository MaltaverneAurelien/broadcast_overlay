import type { Player, Team } from "../types/updateState";
import type BestOf from "../types/bestOf"

import getWidth from "../utils/getWidth";
import Scoreboard from "./Scoreboard";
import StatsRow from "./StatsRow";
import Card from "./Card";

import background from "../assets/background.mp4";

interface Props {
  players: Player[];
  teams: Team[];
  bestOf: BestOf;
  gamesWon: number[]
}

const EndScoreboard: React.FC<Props> = ({ players, teams, bestOf, gamesWon }) => {
  interface PlayerProps {
    team: number;
  }

  const PlayerNames: React.FC<PlayerProps> = ({ team }) => {
    return (
      <>
        {players
          .filter((p) => p.team === team)
          .map((p) => (
            <div
              key={"End"+p.id}
              className={
                "text-white text-center overflow-hidden whitespace-nowrap text-ellipsis " +
                getWidth(players)
              }
            >
              {p.name}
            </div>
          ))}
      </>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden  text-white text-2xl uppercase ">
      <video
        id="bgVideo"
        preload="true"
        autoPlay
        loop
        muted
        className="absolute -z-10"
      >
        <source src={background} type="video/mp4" />
      </video>
      <div className="flex flex-col gap-y-8 px-24 pt-12">
        <div className="flex justify-center w-full">
          <Scoreboard teams={teams} seconds={0} bestOf={bestOf} gamesWon={gamesWon}/>
        </div>
        <div className={`h-20 flex items-center gap-x-4 w-full`}>
          <Card color={"blue"} className="flex flex-grow h-full">
            <div className="w-full flex justify-around">
              <PlayerNames team={0} />
            </div>
          </Card>
          <Card color="main" className="h-full w-96">
            <div className="text-center mx-auto">Scoreboard</div>
          </Card>
          <Card color={"orange"} className="flex flex-grow h-full">
            <div className="w-full flex justify-around">
              <PlayerNames team={1} />
            </div>
          </Card>
        </div>

        <StatsRow keyStat={"score"} players={players} />
        <StatsRow keyStat={"goals"} players={players} />
        <StatsRow keyStat={"shots"} players={players} />
        <StatsRow keyStat={"assists"} players={players} />
        <StatsRow keyStat={"saves"} players={players} />
        <StatsRow keyStat={"demos"} players={players} />
        <StatsRow keyStat={"touches"} players={players} />
      </div>
    </div>
  );
};

export default EndScoreboard;
