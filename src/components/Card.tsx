interface Props {
    color: "blue" | "orange" | "main"
    filled?: boolean
    children?: any
}

const Card: React.FC<Props> = ({ children, color, filled }) => {
    function getColorClasses() {
        const colors = {
            blue: 'from-blue-500 to-green-500',
            orange: 'from-red-500 to-orange-400',
            main: 'from-blue-500 to-red-500'
        }

        return colors[color]
    }
  return (
    <div className={"relative bg-gradient-to-r p-[3px] flex " + getColorClasses()}>
      <div className="w-full h-full overflow-hidden">
        <img
          src="./background.png"
          className="w-full object-cover"
          alt="background"
        />
      </div>
      
      <div className="absolute text-white px-4 flex w-full h-full py-4">{filled === true ? <div className={"w-full h-full bg-gradient-to-r " + getColorClasses()}></div> : children}</div>
    </div>
  );
};

export default Card;
