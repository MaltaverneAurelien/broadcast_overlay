import type { Player } from "../types/updateState";
import Boost from "./Boost";
import PlayerStats from "./PlayerStats";

interface Props {
  player: Player;
}

const TargetPlayerFooter: React.FC<Props> = ({ player }) => {
  return (
    <>
      <section className="mt-auto flex w-full items-center">
        <PlayerStats player={player} />
        <Boost player={player} />
      </section>
    </>
  );
};

export default TargetPlayerFooter;
