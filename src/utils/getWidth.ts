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

// JSON || Variable -> Chemin de l'image (/TFM_Esport.png)


// "TFM_Esport.png" || "TFM_Esport$TFM.png"
// Equipe 1 RL: RQS Esport
// Equipê 2 RL: TFM Esports

// lowerCase, upperCase
// -> -.* -> ["TFM", "ESPORT"]
// Match ["TFM", "ESPORT"] -> "TFM ESPORT" -> "TFM ESPORT" === "TFM" // False
// Blacklist, Esport, Esports, Club, Gaming, Clan
// ["TFM", "ESPORT"] -> ["TFM"]
// Match ["TFM"].includes("TFM Esports") // False
// "TFM Esports" -> ["TFM", "ESPORTS"] -> ["TFM"] ->(join(" ")) "TFM"
// Match ["TFM"].includes("TFM") // True



// Match -> 
// Match Equipe2
