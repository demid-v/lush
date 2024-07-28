import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const brightness = (r: number, g: number, b: number) =>
    Math.round((r * 299 + g * 587 + b * 114) / 1000);

  const setColor = (r: number, g: number, b: number) => {
    (document.querySelector(":root") as HTMLElement | null)?.style.setProperty(
      "--background",
      `${r} ${g} ${b}`,
    );

    setTheme(brightness(r, g, b) < 125 ? "dark" : "light");
  };

  return { theme, setColor };
};
