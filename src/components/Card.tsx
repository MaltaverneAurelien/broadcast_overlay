import getColorClasses from "../utils/getColorClasses";
import getRotationClass from "../utils/getRotationClass";

interface Props {
  color: "blue" | "orange" | "main";
  filled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface CardFillProps {
  colorClasses: string;
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
