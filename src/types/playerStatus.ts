export type StatusEvent = "assist" | "shot" | "goal" | "demo" | "save";

interface PlayerStatus {
  player_id: string;
  event: StatusEvent;
}

export default PlayerStatus;
