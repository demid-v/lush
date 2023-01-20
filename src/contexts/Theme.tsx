import Head from "next/head";
import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
  setColor: (r: number, g: number, b: number) => void;
} | null>(null);

const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [headerColor, setHeaderColor] = useState<string>("255, 255, 255");

  const brightness = (r: number, g: number, b: number) =>
    Math.round((r * 299 + g * 587 + b * 114) / 1000);

  function setColor(r: number, g: number, b: number) {
    setHeaderColor(`${r}, ${g}, ${b}`);
    setTheme(brightness(r, g, b) < 125 ? "dark" : "light");
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
    throw new Error("useTheme must be used inside a ThemeContext");
  }

  return context;
}

export default Theme;
export { useTheme };
