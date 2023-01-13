import getColorClasses from "../utils/getColorClasses";

interface Props {
  color: "blue" | "orange" | "main";
  filled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface CardFillProps {
  colorClasses: string;
}

// TODO: Bouiger colors et getRotationClass dans un fichier utils
const colors = {
  "orange": "rotate-[-0.3deg]",
  "blue": "rotate-[0.3deg]",
  "main": ""
}

function getRotationClass(color: "orange" | "blue" | "main") {
  return colors[color]
}

const CardFill: React.FC<CardFillProps> = ({ colorClasses }) => {
  return <div className={"w-full h-full bg-gradient-to-r " + colorClasses} />;
};

const Card: React.FC<Props> = ({ children, color, filled, className }) => {
  return (
    <div
      className={`relative bg-gradient-to-r p-[3px] flex ${getColorClasses(color)} ${className}`}
    >
      <div className={`w-full h-full overflow-hidden ${getRotationClass(color)}` }>
        <img
          src="./background.png"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>

      <div className="absolute text-white p-2 flex top-0 left-0 right-0 bottom-0 items-center w-full">
        {filled === true ? (
          <CardFill colorClasses={getColorClasses(color)} />
        ) : children
        }
      </div>
    </div>
  );
};

export default Card;
