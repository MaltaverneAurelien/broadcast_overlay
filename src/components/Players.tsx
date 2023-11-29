import Card from "./Card";
import { useState } from "react";
import CardBoost from "./CardBoost";
import type { Player } from "../types/updateState";
import PlayerStatus, { StatusEvent } from "../types/playerStatus";

interface Props {
  players: Player[];
  color: "blue" | "orange";
  target: string;
  playersStatus: PlayerStatus[];
}

const Players: React.FC<Props> = ({
  players,
  color,
  target,
  playersStatus,
}) => {
  function getTranslate(team: number) {
    if (team === 0) return "translate-x-3";

    return "-translate-x-3";
  }

  const [lastPlayerEvents, setLastPlayerEvents] = useState<{
    [key: string]: StatusEvent[];
  }>({});

  function getEvent(p: Player) {
    const events = playersStatus
      .filter((player) => player.player_id == p.id)
      .map((e) => e.event);

    if (events !== undefined && events.length != 0) {
      lastPlayerEvents[p.id] = events;
      return events;
    }

    return undefined;
  }

  function getLastEvent(p: Player) {
    return lastPlayerEvents[p.id] || [];
  }

  return (
    <>
      {players.map((p) => (
        <div
          className={`relative h-[3.5rem] overflow-hidden transition-all duration-1000 
          ${p.isDead ? "grayscale" : ""} 
          ${p.id == target ? "brightness-200" : ""} 
          ${p.id == target ? getTranslate(p.team) : ""}`}
        >
          <Card
            key={p.id}
            color={p.id == target ? "white" : color}
            className="h-full"
          >
            <div className="w-full">
              <div className="grid grid-cols-12 w-11/12 mx-auto">
                <p className="text-xl col-span-10 text-ellipsis overflow-hidden whitespace-nowrap ">
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
          <Card
            key={p.id + "2121"}
            color={p.id == target ? "white" : color}
            className={
              "h-full transition-all duration-500 " +
              (getEvent(p) !== undefined ? "-translate-y-full" : "")
            }
          >
            <div className="w-full flex items-center justify-between px-4">
              <span className="text-xl text-ellipsis overflow-hidden whitespace-nowrap pr-2 ">
                {p.name}
              </span>
              <div className="flex gap-x-4 items-center">
                {getLastEvent(p).includes("demo") && (
                  <img src="./icons/demolition.png" className="w-7 h-7 object-contain" />
                )}
                {getLastEvent(p).includes("assist") && (
                  <img src="./icons/assist.png" className="w-7 h-7 object-contain" />
                )}
                {getLastEvent(p).includes("goal") && (
                  <img src="./icons/goal.png" className="w-7 h-7 object-contain" />
                )}
                {getLastEvent(p).includes("save") && (
                  <img src="./icons/save.png" className="w-7 h-7 object-contain" />
                )}
                {getLastEvent(p).includes("shot") && (
                  <img src="./icons/target_shot.png" className="w-7 h-7 object-contain" />
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default Players;
