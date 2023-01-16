import type { Player } from "../types/updateState";
import Card from "./Card";
import getColorClasses from "../utils/getColorClasses";
import getRotationClass from "../utils/getRotationClass";

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
            <div className="grid grid-cols-12 w-11/12 overflow-hidden mx-auto">
              <p className="text-xl col-span-10 text-ellipsis overflow-hidden">
                {p.name}
              </p>
              <p className="text-xl text-end font-semibold col-span-2">
                {p.boost}
              </p>
            </div>

            {/* TODO: Composant CardBoost */}
            <div className="bottom-2 mt-1 left-0 right-0 mx-2 flex items-center bg-neutral-100/30 h-1">
              <div
                className={`flex bottom-0 left-0 h-1 transition-all duration-300 bg-gradient-to-r rounded-full ${getColorClasses(
                  color
                )} ${getRotationClass(color)}`}
                style={{
                  width: `${p.boost}%`,
                }}
              />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Players;
