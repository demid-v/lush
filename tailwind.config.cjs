/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "rgb(var(--color-header))",
      },
    },
  },
  plugins: [],
};
