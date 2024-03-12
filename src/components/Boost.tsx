import type { Player } from "../types/updateState";
import getTeamColor from "../utils/getTeamColor";
import getColorClasses from "../utils/getColorClasses";

import { useRef, useEffect } from "react";

interface Props {
  player: Player;
}

const Boost: React.FC<Props> = ({ player }) => {
  const colorClasses = getColorClasses(getTeamColor(player.team));

  const circle = useRef<SVGCircleElement>(null);
  const circleBackground = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!circle?.current) return;
    if (!circleBackground?.current) return;

    const radius = circle.current.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.current.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.current.style.strokeDashoffset = `${circumference}`;
    circleBackground.current.style.strokeDasharray = `${circumference} ${circumference}`;
    circleBackground.current.style.strokeDashoffset = `${circumference}`;

    const offset = circumference - ((100 - 8) / 100) * circumference;
    circleBackground.current.style.strokeDashoffset = offset as unknown as string;
  }, [circle, circleBackground]);

  useEffect(() => {
    if (!circle?.current) return;
    if (!player) return;

    const radius = circle.current.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    let value = player.boost;
    const valueOffset = 8;
    if (value >= valueOffset) value -= valueOffset;

    const offset = circumference - (value / 100) * circumference;
    circle.current.style.strokeDashoffset = offset as unknown as string;
  }, [player]);

  return (
    <>
      <div className="relative ml-auto rounded-full w-48 h-48 flex items-center justify-center">
        <img
          src="./boost-Gel.png"
          className={`absolute z-10 w-11/12 h-11/12 rounded-full flex items-center justify-center opacity-50`}
        />
        <div
          className={`absolute w-full h-full bg-gradient-to-br ${colorClasses} bg-clip-text opacity-90 flex justify-center`}
        >
          <svg className="absolute w-full h-full">
            <defs>
              <linearGradient id="0" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#22c55e" />
              </linearGradient>
              <linearGradient id="1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ef4444" />
                <stop offset="100%" stop-color="#fb923c" />
              </linearGradient>
            </defs>
            <circle
              ref={circleBackground}
              stroke-linecap="round"
              className="transition-all duration-300 -rotate-[75deg] origin-center opacity-30"
              stroke="#d1d5db"
              fill="transparent"
              stroke-width="7"
              r="83"
              cx="96"
              cy="96"
            />
            <circle
              ref={circle}
              stroke-linecap="round"
              className="transition-all duration-300 -rotate-[75deg] origin-center"
              stroke={`url(#${player.team})`}
              fill="transparent"
              stroke-width="7"
              r="83"
              cx="96"
              cy="96"
            />
          </svg>
        </div>

        <div>
          <img
            src="./boost-Plein.png"
            className="w-full h-full -z-10 object-cover rounded-full"
            alt="background"
          />
        </div>
        <div
          className={`absolute bg-gradient-to-br ${colorClasses} w-4/6 h-4/6 rounded-full flex items-center blur-lg justify-center opacity-50`}
        />
        <span className="absolute text-white pt-7 font-bold text-4xl opacity-80">
          {player.boost}
        </span>
      </div>
    </>
  );
};

export default Boost;