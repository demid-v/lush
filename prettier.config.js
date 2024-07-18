/** @type {import("prettier").Config} */
const config = {
  plugins: [
    /**
     * Must come last
     * https://dev.to/kachidk/common-prettier-plugins-installation-30hc
     */
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
