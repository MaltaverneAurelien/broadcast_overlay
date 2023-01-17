import Card from "./Card";
import CardBoost from "./CardBoost";
import type { Player } from "../types/updateState";

interface Props {
  players: Player[];
  color: "blue" | "orange";
  target: string;
}

const Players: React.FC<Props> = ({ players, color, target }) => {
  return (
    <>
      {players.map((p) => (
        <Card
          key={p.id}
          color={p.id == target ? "white" : color}
          className={`h-[3.5rem] transition-all duration-1000 ${
            p.isDead ? "grayscale" : ""
          } 
          ${p.id == target ? "brightness-200" : ""}`}
        >
          <div className="w-full">
            <div className="grid grid-cols-12 w-11/12 mx-auto">
              <p className="text-xl col-span-10 text-ellipsis overflow-hidden whitespace-nowrap">
                {p.name}
              </p>
              <p className="text-xl text-end font-semibold col-span-2">
                {p.boost}
              </p>
            </div>
            <CardBoost
              color={p.id == target ? "white" : color}
              boost={p.boost}
            />
          </div>
        </Card>
      ))}
    </>
  );
};

export default Players;
