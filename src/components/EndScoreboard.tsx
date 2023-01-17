import { Team } from "../types/updateState";
import type { Player } from "../types/updateState";

interface Props {
  teams: Team[];
  players: Player[];
}

const EndScoreboard: React.FC<Props> = ({ teams, players }) => {
  return (
  <div className="text-2xl">LE FUTUR TABLEAU DES SCORES CAR LA GAME EST TERMINE EN FAITE</div>
  );
};

export default EndScoreboard;
