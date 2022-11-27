/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "rgb(var(--color-header))",
      },
      fontSize: { header__logo: "1.4rem", "header-nav": "0.9rem" },
      spacing: {
        header: "2.1875rem",
        header__nav: "0.313rem",
        header__link: "0.9375rem",
      },
    },
  },
  plugins: [],
};
