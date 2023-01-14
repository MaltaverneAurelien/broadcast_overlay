const colors = {
  orange: "rotate-[-0.3deg]",
  blue: "rotate-[0.3deg]",
  main: "",
};

function getRotationClass(color: "orange" | "blue" | "main") {
  return colors[color];
}

export default getRotationClass;
