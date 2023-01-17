import type { Player } from "../types/updateState";
import getColorClasses from "../utils/getColorClasses";
import getRotationClass from "../utils/getRotationClass";

interface Props {
  color: "blue" | "orange" | "white";
  boost: number;
}

const CardBoost: React.FC<Props> = ({ color, boost }) => {
  return (
    <div className="bottom-2 mt-1 left-0 right-0 mx-2 flex items-center bg-neutral-100/30 h-1">
      <div
        className={`flex bottom-0 left-0 h-1 transition-all duration-300 bg-gradient-to-r rounded-full ${getColorClasses(
          color
        )} ${getRotationClass(color)}`}
        style={{
          width: `${boost}%`,
        }}
      />
    </div>
  );
};

export default CardBoost;
