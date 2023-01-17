import { Player } from "../types/updateState";

function getTeamColor(team: number) {
  return team === 0 ? "blue" : "orange";
}

export default getTeamColor;