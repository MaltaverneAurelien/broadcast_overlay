/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
    },
    fontFamily: {
      sans: ["Montserrat", 'sans-serif']
    },
    colors: {
      neutral: colors.neutral,
      white: colors.white,
      orange: {
        50: "#fffaf2",
        100: "#fff5e6",
        200: "#ffe6c0",
        300: "#ffd699",
        400: "#feb84d",
        500: "#fe9901",
        600: "#e58a01",
        700: "#bf7301",
        800: "#985c01",
        900: "#7c4b00",
      },
      red: {
        50: "#fff3f2",
        100: "#ffe8e6",
        200: "#ffc4c0",
        300: "#ffa19a",
        400: "#ff5b4f",
        500: "#ff1403",
        600: "#e61203",
        700: "#bf0f02",
        800: "#990c02",
        900: "#7d0a01",
      },
      blue: {
        50: "#f2f7ff",
        100: "#e6f0fe",
        200: "#c0d9fd",
        300: "#9ac3fc",
        400: "#4e95fa",
        500: "#0268f8",
        600: "#025edf",
        700: "#024eba",
        800: "#013e95",
        900: "#01337a",
      },
      green: {
        50: "#f2fefc",
        100: "#e6fdf8",
        200: "#bffaee",
        300: "#99f7e3",
        400: "#4df1cf",
        500: "#00ebba",
        600: "#00d4a7",
        700: "#00b08c",
        800: "#008d70",
        900: "#00735b",
      },
    },
  },
  plugins: [],
};
