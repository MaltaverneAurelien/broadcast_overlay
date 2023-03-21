import type { TransitionStatus } from "react-transition-group/Transition";
import Transition from "react-transition-group/Transition";
import GameStatus from "../types/gameStatus";
import GoalScoredData from "../types/goalScored";
import PlayerStatus from "../types/playerStatus";
import type { Player, Team } from "../types/updateState";
import type BestOf from "../types/bestOf"

import Players from "./Players";
import ReplayFooter from "./ReplayFooter";
import ReplayStats from "./ReplayStats";
import Scoreboard from "./Scoreboard";
import TargetPlayerFooter from "./TargetPlayerFooter";

type Props = {
  players: Player[];
  targetPlayer?: Player | null;
  state?: TransitionStatus;
  lastGoal?: GoalScoredData;
  teams: Team[];
  seconds: number;
  gameStatus: GameStatus;
  bestOf: BestOf;
  gamesWon: number[]
  playersStatus: PlayerStatus[];
  isOT: boolean;
};

const Main: React.FC<Props> = ({
  players,
  targetPlayer,
  state,
  lastGoal,
  teams,
  seconds,
  gameStatus,
  bestOf,
  gamesWon,
  playersStatus,
  isOT
}) => {
  if (!state) state = "entered";

  return (
    <>
      <main className="w-screen h-screen flex flex-col pt-3 px-5 pb-7">
        <section className="flex justify-between">
          <div className="flex flex-col w-64 gap-y-2">
            <Players
              players={players.filter((p) => p.team == 0)}
              color="blue"
              target={targetPlayer?.id || ""}
              playersStatus={playersStatus}
            />
          </div>
          <Scoreboard teams={teams} seconds={seconds} bestOf={bestOf} gamesWon={gamesWon} isOT={isOT} />
          <div className="flex flex-col w-64 gap-y-2">
            <Players
              players={players.filter((p) => p.team == 1)}
              color="orange"
              target={targetPlayer?.id || ""}
              playersStatus={playersStatus}
            />
          </div>
        </section>

        <Transition in={gameStatus === "replay" ? true : false} timeout={500}>
          {(state) => (
            <>
              {lastGoal && (
                <ReplayStats
                  state={state}
                  player={targetPlayer as Player}
                  lastGoal={lastGoal}
                />
              )}
              <ReplayFooter state={state} />
            </>
          )}
        </Transition>

        <Transition in={gameStatus === "playing" ? true : false} timeout={500}>
          {(state) => (
            <>
              {targetPlayer && (
                <TargetPlayerFooter
                  state={state}
                  player={targetPlayer as Player}
                />
              )}
            </>
          )}
        </Transition>
      </main>
    </>
  );
};

export default Main;
