/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#000009",
        deepTeal: "#05668d",
        emeraldAccent: "#16c172",
        softWhite: "#EBF2FA",
      },
    },
  },
  plugins: [],
};
