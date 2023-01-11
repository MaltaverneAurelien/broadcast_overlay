interface Props {
  color: "blue" | "orange" | "main";
  filled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface CardFillProps {
  colorClasses: string;
}

const colors = {
  blue: "from-blue-500 to-green-500",
  orange: "from-red-500 to-orange-400",
  main: "from-green-500 to-red-500",
};

const CardFill: React.FC<CardFillProps> = ({ colorClasses }) => {
  return <div className={"w-full h-full bg-gradient-to-r " + colorClasses} />;
};

const Card: React.FC<Props> = ({ children, color, filled, className }) => {
  function getColorClasses() {
    return colors[color];
  }
  return (
    <div
      className={`relative bg-gradient-to-r p-[3px] flex ${getColorClasses()} ${className}`}
    >
      <div className="w-full h-full overflow-hidden">
        <img
          src="./background.png"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>

      <div className="absolute text-white p-2 flex top-0 left-0 right-0 bottom-0 items-center w-full">
        {filled === true ? (
          <CardFill colorClasses={getColorClasses()} />
        ) : children
        }
      </div>
    </div>
  );
};

export default Card;
