import Link from "next/link";
import { useTheme } from "../contexts/Theme";
import SearchBar from "./SearchBar";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="fixed z-20 flex h-10 w-full items-center justify-between bg-header px-9">
      <Link
        href="/"
        className={
          "text-[1.4rem] italic tracking-[0.7em]" +
          (theme === "dark" ? " text-white" : "")
        }
      >
        Lush
      </Link>
      <div className="flex items-center">
        <SearchBar />
        <nav
          className={"text-[0.9rem]" + (theme === "dark" ? " text-white" : "")}
        >
          <ul className="flex gap-1.5">
            <li>
              <Link href="/tracks" className="px-3.5 hover:underline">
                Music
              </Link>
            </li>
            <li>
              <Link href="/artists" className="px-3.5 hover:underline">
                Artists
              </Link>
            </li>
            <li>
              <Link href="/albums" className="px-3.5 hover:underline">
                Albums
              </Link>
            </li>
            <li>
              <Link href="/playlists" className="px-3.5 hover:underline">
                Playlists
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
