/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"',],
        body: ['"Roboto Mono"',],
      },
    },
  },
  plugins: [],
};
