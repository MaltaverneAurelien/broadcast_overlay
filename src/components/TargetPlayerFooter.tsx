import type { TransitionStatus } from "react-transition-group/Transition";
import type { Player } from "../types/updateState";

import Boost from "./Boost";
import PlayerStats from "./PlayerStats";

type Props = {
  player: Player;
  state?: TransitionStatus;
};

const TargetPlayerFooter: React.FC<Props> = ({ player, state }) => {
  if (!state) state = "entered";

  return (
    <>
      <section
        className={`mt-auto flex w-full items-center transition-all duration-300 ${
          state === "entered" ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <PlayerStats player={player} />
        <Boost player={player} />
      </section>
    </>
  );
};

export default TargetPlayerFooter;
