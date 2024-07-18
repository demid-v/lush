import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "rgb(var(--color-header) / <alpha-value>)",
      },
    },
  },
} satisfies Config;

export default config;
