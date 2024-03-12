import type BestOf from "../types/bestOf";

import Card from "./Card";
import { Team } from "../types/updateState";
import convertSeconds from "../utils/convertSeconds";

import teamsLogo from "../assets/data.json";

interface Props {
  teams: Team[];
  seconds: number;
  bestOf: BestOf;
  gamesWon: number[]; // [1, 2] 1 match win bleu, 2 match orange
  isOT?: boolean;
}

const Scoreboard: React.FC<Props> = ({
  teams,
  seconds,
  bestOf,
  gamesWon,
  isOT,
}) => {
  let firstOf = 0;

  if (bestOf === 3) firstOf = 2;
  else if (bestOf === 5) firstOf = 3;
  else if (bestOf === 7) firstOf = 4;

  const findTeamLogo = (team: number) => {
    if (teams.length === 0) return "";
    const logo = teamsLogo.find(
      (t) =>
        t.name.toLowerCase() == teams[team].name.toLowerCase() ||
        t.aliases
          .map((a) => a.toLowerCase())
          .includes(teams[team].name.toLowerCase())
    );
    if (logo) return logo.filename;
  };

  return (
    <div className="grid grid-cols-12 gap-x-4 w-[74rem]">
      <div className="col-span-4 flex flex-col gap-y-1">
        <div className="flex gap-x-1">
          <Card color="blue" className="w-full h-16">
            <img
              src="./hiver_background_player.png"
              className={`absolute top-0 right-0.5 w-full h-full `}
            />
            {findTeamLogo(0) && (
              <img
                className="rounded-full z-10 h-20 w-1/4 object-contain"
                src={"/logo/" + findTeamLogo(0)}
              />
            )}
            <p className="z-10 text-2xl font-semibold mx-auto">
              {teams[0]?.name}
            </p>
          </Card>
        </div>
        <div className="flex flex-row-reverse gap-x-1 w-full">
          {[...Array(firstOf)].map((_, i) => (
            <Card
              key={"BOB" + i}
              color="blue"
              className="w-2/12 h-8"
              filled={i + 1 <= gamesWon[0]}
            >
              <img
                src="./hiver_background_bestof.png"
                className={`absolute w-full h-full top-0 right-0.5`}
              />
            </Card>
          ))}
        </div>
      </div>
      <div className="col-span-4 flex flex-col w-full gap-y-2">
        <div className="grid grid-cols-4 gap-x-2">
          <div>
            <Card color="blue" className="w-full h-16">
              <img
                src="./hiver_background_score.png"
                className={`absolute top-0 right-0.5 w-full h-full `}
              />
              <span className="mx-auto font-bold text-3xl">
                {teams[0]?.score}
              </span>
            </Card>
          </div>
          <div className="col-span-2 h-16 flex">
            <Card color="main" className="w-full">
              <img
                src="./hiver_background_score.png"
                className={`absolute top-0 right-0.5 w-full h-full `}
              />
              <p className="mx-auto font-semibold text-3xl">
                {isOT && "+"}
                {convertSeconds(seconds)}
              </p>
            </Card>
          </div>
          <div>
            <Card color="orange" className="w-full h-16">
              <img
                src="./hiver_background_score.png"
                className={`absolute top-0 right-0.5 w-full h-full `}
              />
              <span className="mx-auto font-bold text-3xl">
                {teams[1]?.score}
              </span>
            </Card>
          </div>
        </div>
        <div>
          {isOT === true && (
            <Card
              color="main"
              className="w-2/3 h-9 mx-auto opacity-90 animate-pulse"
            >
              <p className="mx-auto uppercase">Overtime</p>
            </Card>
          )}
          {/* {isOT === false && (
            <Card
              color="main"
              className="w-2/3 h-9 mx-auto"
            >
              <p className="mx-auto uppercase">DCup #42 - 3vs3</p>
            </Card>
          )} */}
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="orange" className="w-full h-16">
          <img
            src="./hiver_background_player.png"
            className={`absolute top-0 right-0.5 w-full h-full `}
          />
          <p className="z-10 mx-auto text-2xl font-semibold">
            {teams[1]?.name}
          </p>
          {findTeamLogo(1) && (
            <img
              className="rounded-full z-10 h-20 w-1/4 object-contain"
              src={"/logo/" + findTeamLogo(1)}
            />
          )}
        </Card>
        <div className="flex gap-x-1 w-full">
          {[...Array(firstOf)].map((_, i) => (
            <Card
              key={"BOO" + i}
              color="orange"
              className="w-2/12 h-8"
              filled={i + 1 <= gamesWon[1]}
            >
              <img
                src="./hiver_background_bestof.png"
                className={`absolute w-full h-full top-0 right-0.5`}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
