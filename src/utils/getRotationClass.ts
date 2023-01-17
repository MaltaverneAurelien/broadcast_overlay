const colors = {
  orange: "rotate-[-0.3deg]",
  blue: "rotate-[0.3deg]",
  main: "",
  white: "",
};

function getRotationClass(color: "orange" | "blue" | "main" | "white") {
  return colors[color];
}

export default getRotationClass;
