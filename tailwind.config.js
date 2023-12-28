/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10CBE4",
      },
      fontSize: {
        title1: "3rem",
      },
      fontFamily: {
        cursive: "cursive",
      },
      boxShadow: {
        backdrop: "0px 0px 0px 20000px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
