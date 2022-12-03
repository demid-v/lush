/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "rgb(var(--color-header))",
      },
      spacing: {
        header__link: "0.9375rem",
      },
      width: {
        search_bar__first_row__button: "2.813rem",
        search_bar__first_row__button_icon: "0.625rem",
      },
      gridTemplateColumns: { grid: "repeat(auto-fill, minmax(200px, 1fr))" },
    },
  },
  plugins: [],
};
