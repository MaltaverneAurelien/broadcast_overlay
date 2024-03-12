import { Player } from "../types/updateState";

function getWidth(players: Player[]) {
  switch (players.length) {
    case 2:
      return "w-96";

    case 4:
      return "w-52";

    case 6:
      return "w-48";

    case 8:
      return "w-36";

    default:
      return "";
  }
}

export default getWidth;