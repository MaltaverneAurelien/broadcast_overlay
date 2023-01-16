import type { Player } from "../types/updateState";
import Card from "./Card";

interface Props {
  children?: React.ReactNode;
  className?: string;
  players: Player[];
  color: "blue" | "orange";
}

const Players: React.FC<Props> = ({ children, className, players, color }) => {
  return (
    <>
      {players.map((p) => (
        <Card color={color} boost={true} className="h-[3.5rem]" style={{ width: `${p.boost}%` }}>
          <div className="grid grid-cols-12 w-11/12 overflow-hidden mx-auto">
            <p className="text-xl col-span-10 text-ellipsis overflow-hidden">{p.name}</p>
            <p className="text-xl text-end font-semibold col-span-2">{p.boost}</p>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Players;
