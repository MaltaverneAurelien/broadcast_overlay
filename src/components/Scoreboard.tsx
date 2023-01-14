import Card from "./Card";
import { Team } from "../types/updateState";
import convertSeconds from "../utils/convertSeconds";

interface Props {
  teams: Team[];
  seconds: number;
}

const Scoreboard: React.FC<Props> = ({ teams, seconds }) => {
  return (
    <div className="grid grid-cols-12 gap-x-4 w-[64rem]">
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="blue" className="w-full h-16">
          <p className="mx-auto text-2xl font-semibold">{teams[0]?.name}</p>
        </Card>
      </div>
      <div className="col-span-4 flex flex-col w-full gap-y-2">
        <div className="grid grid-cols-4 gap-x-2">
          <div>
            <Card color="blue" className="w-full h-16">
              <span className="mx-auto font-bold text-2xl">
                {teams[0]?.score}
              </span>
            </Card>
          </div>
          <div className="col-span-2 h-16 flex">
            <Card color="main" className="w-full">
              <p className="mx-auto font-semibold text-2xl">
                {convertSeconds(seconds)}
              </p>
            </Card>
          </div>
          <div>
            <Card color="orange" className="w-full h-16">
              <span className="mx-auto font-bold text-xl">
                {teams[1]?.score}
              </span>
            </Card>
          </div>
        </div>
        <div>
          <Card color="main" className="w-full h-16">
            <p className="mx-auto font-semibold text-2xl">DoD Cup #29</p>
          </Card>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-1">
        <Card color="orange" className="w-full h-16">
          <p className="mx-auto text-2xl font-semibold">{teams[1]?.name}</p>
        </Card>
      </div>
    </div>
  );
};

export default Scoreboard;