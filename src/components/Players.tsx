import type { Player } from "../types/updateState";
import Card from "./Card";
import getColorClasses from "../utils/getColorClasses";
import getRotationClass from "../utils/getRotationClass";
import CardBoost from "./CardBoost";

interface Props {
  children?: React.ReactNode;
  className?: string;
  players: Player[];
  color: "blue" | "orange";
}

// TODO : Changer la barre de boost + card si c'est le joueur actif

const Players: React.FC<Props> = ({ children, className, players, color }) => {
  return (
    <>
      {players.map((p) => (
        <Card key={p.id} color={color} className="h-[3.5rem]">
          <div className="w-full">
            <div className="grid grid-cols-12 w-11/12 mx-auto">
              <p className="text-xl col-span-10 text-ellipsis overflow-hidden whitespace-nowrap">
                {p.name}
              </p>
              <p className="text-xl text-end font-semibold col-span-2">
                {p.boost}
              </p>
            </div>
            <CardBoost color={color} boost={p.boost} />
          </div>
        </Card>
      ))}
    </>
  );
};

export default Players;
