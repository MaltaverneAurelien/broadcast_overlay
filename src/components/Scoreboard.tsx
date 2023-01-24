import type BestOf from "../types/bestOf";

import Card from "./Card";
import { Team } from "../types/updateState";
import convertSeconds from "../utils/convertSeconds";

interface Props {
  teams: Team[];
  seconds: number;
  bestOf: BestOf;
  gamesWon: number[]; // [1, 2] 1 match win bleu, 2 match orange
}

const Scoreboard: React.FC<Props> = ({ teams, seconds, bestOf, gamesWon }) => {
  let firstOf = 0;

  if (bestOf === 3) firstOf = 2;
  else if (bestOf === 5) firstOf = 3;
  else if (bestOf === 7) firstOf = 5;

  return (
    <div className="grid grid-cols-12 gap-x-4 w-[64rem]">
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="blue" className="w-full h-16">
          <p className="mx-auto text-2xl font-semibold">{teams[0]?.name}</p>
        </Card>
        <div className="flex flex-row-reverse gap-x-1 w-full">
          {[...Array(firstOf)].map((_, i) => (
            <Card
              key={"BOB" + i}
              color="blue"
              className="w-2/12 h-8"
              filled={i + 1 <= gamesWon[0]}
            />
          ))}
        </div>
      </div>
      <div className="col-span-4 flex flex-col w-full gap-y-2">
        <div className="grid grid-cols-4 gap-x-2">
          <div>
            <Card color="blue" className="w-full h-16">
              <span className="mx-auto font-bold text-3xl">
                {teams[0]?.score}
              </span>
            </Card>
          </div>
          <div className="col-span-2 h-16 flex">
            <Card color="main" className="w-full">
              <p className="mx-auto font-semibold text-3xl">
                {convertSeconds(seconds)}
              </p>
            </Card>
          </div>
          <div>
            <Card color="orange" className="w-full h-16">
              <span className="mx-auto font-bold text-3xl">
                {teams[1]?.score}
              </span>
            </Card>
          </div>
        </div>
        {/* <div>
          <Card color="main" className="w-full h-16">
            <p className="mx-auto font-semibold text-2xl">Dioscure Cup #</p>
          </Card>
        </div> */}
      </div>
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="orange" className="w-full h-16">
          <p className="mx-auto text-2xl font-semibold">{teams[1]?.name}</p>
        </Card>
        <div className="flex gap-x-1 w-full">
          {[...Array(firstOf)].map((_, i) => (
            <Card
              key={"BOO" + i}
              color="orange"
              className="w-2/12 h-8"
              filled={i + 1 <= gamesWon[1]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
