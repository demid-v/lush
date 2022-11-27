import Head from "next/head";
import { createContext, FC, ReactNode, useContext, useState } from "react";

const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: Function;
  setColor: Function;
} | null>(null);

const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [headerColor, setHeaderColor] = useState<string>("255, 255, 255");

  function setColor(r: number, g: number, b: number) {
    setHeaderColor(`${r}, ${b}, ${g}`);
  }

  return (
    <>
      <Head>
        <style>:root {`{--color-header: ${headerColor}}`}</style>
      </Head>
      <ThemeContext.Provider value={{ theme, setTheme, setColor }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a `ThemeContext`");
  }

  return context;
}

export default Theme;
export { useTheme };
