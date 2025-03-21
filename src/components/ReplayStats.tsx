import type { TransitionStatus } from "react-transition-group/Transition";
import type { Player } from "../types/updateState";

import convertSeconds from "../utils/convertSeconds";
import getTeamColor from "../utils/getTeamColor";

import Card from "./Card";
import GoalScoredData from "../types/goalScored";

type Props = {
  player: Player;
  state?: TransitionStatus;
  lastGoal: GoalScoredData;
};

const ReplayStats: React.FC<Props> = ({ player, state, lastGoal }) => {
  if (!state) state = "entered";

  return (
    <>
      <section
        className={`mt-auto flex flex-col w-full items-center mb-20 transition-all duration-300 ${
          state === "entered" ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <Card
          color={getTeamColor(lastGoal?.scorer.teamnum || 0)}
          className="w-[38rem] h-24"
        >
          {/* <img
            src="./hiver_background_player.png"
            className={`absolute w-full h-full top-0 right-0.5`}
          /> */}
          <div className="w-full flex justify-around px-12 items-center pt-1">
            <div className="flex flex-col items-center gap-y-1.5">
              <img
                src="./icons/scorer.png"
                className="w-8 h-8 object-contain"
              />
              <span
                className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  maxWidth: lastGoal?.assister.name !== "" ? "8rem" : "12rem",
                }}
              >
                {lastGoal?.scorer.name}
              </span>
            </div>

            <div className="flex flex-col items-center gap-y-1.5">
              <img src="./icons/goal.png" className="w-8 h-8 object-contain" />
              <span className="font-semibold max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
                {player?.goals} buts
              </span>
            </div>

            {lastGoal?.assister.name !== "" && (
              <div className="flex flex-col items-center gap-y-1.5">
                <img
                  src="./icons/assist.png"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-semibold max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {lastGoal?.assister.name}
                </span>
              </div>
            )}

            <div className="flex flex-col items-center gap-y-1.5">
              <img
                src="./icons/ball_speed.png"
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold">
                {Math.floor(lastGoal?.goalspeed || 0)} km/h
              </span>
            </div>

            <div className="flex flex-col items-center gap-y-1.5">
              <img src="./icons/timer.png" className="w-8 h-8 object-contain" />
              <span className="font-semibold">
                {convertSeconds(lastGoal?.goaltime || 0)}
              </span>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default ReplayStats;
