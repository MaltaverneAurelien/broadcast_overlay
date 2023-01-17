import { Player } from "../types/updateState";

function getTeamColor(player: Player) {
  return player.team === 0 ? "blue" : "orange";
}

export default getTeamColor;