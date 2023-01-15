type Colors = {
  [key: string]: string;
};

const colors: Colors = {
  blue: "from-blue-500 to-green-500",
  orange: "from-red-500 to-orange-400",
  main: "from-green-500 to-red-500",
};

function getColorClasses(color: string) {
  return colors[color];
}

export default getColorClasses;
