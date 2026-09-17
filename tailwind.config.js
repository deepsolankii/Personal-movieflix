/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          750: "#333",
          550: "#8c8c8c",
        },
      },
    },
  },
  plugins: [],
};
