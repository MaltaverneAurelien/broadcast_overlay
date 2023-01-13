import type { Player } from "../types/updateState";
import Card from "./Card";

interface Props {
  children?: React.ReactNode;
  className?: string;
  players: Player[];
  color: "blue" | "orange";
}

const Players: React.FC<Props> = ({ children, className, players, color }) => {
  // TODO: implementer la barre de boost 
  // Ajoute une div dans la Card,
  // width 100% (w-full) et genre h-0.5 ou h-1
  // essaie de la positionner en bas de la carte mais si tu n'y arrives pas, ne t'embete pas
  // Met la couleur de la div en fonction de la couleur de la carte, tu peux utiliser la fonction getColorClasses, si tu n'y arrives pas c'est pas grave non plus
  // Ajouter un "style" sur la div pour lui donner une largeur en fonction du boost du joueur
  // SPOILER: si tu veux te débrouiller seul, ne regarde pas la fin de la ligne, sinon : scroll un peu sur la droite                                                                                                                          style={{ width: `${p.boost}%` }} 
  return (
    <>
      {players.map((p) => (
        <Card color={color} filled={false} className="h-[3.5rem]">
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
