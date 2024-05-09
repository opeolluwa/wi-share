/** @type {import('tailwindcss').Config} */


import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";
// import diasyUi from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      dark: colors.neutral,
      red: colors.red,
      app: {
        DEFAULT: "#3074F5",
        50: "#DFEAFD",
        100: "#CCDDFD",
        200: "#A5C2FB",
        300: "#7EA8F9",
        400: "#578EF7",
        500: "#3074F5",
        600: "#0B55E2",
        700: "#0841AC",
        800: "#062D77",
        900: "#031941",
        950: "#020F27",
      },
    },
    extend: {},
  },
  plugins: [forms, ],
};
