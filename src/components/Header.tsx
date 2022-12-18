import Link from "next/link";
import { useTheme } from "../contexts/Theme";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="fixed z-20 flex h-10 w-full items-center gap-x-12 bg-header px-[2.1875rem]">
      <Link
        href="/"
        className={
          "text-[1.4rem] italic leading-7 tracking-[0.7em]" +
          (theme === "dark" ? " text-white" : "")
        }
      >
        Lush
      </Link>
      <div className="invisible h-full flex-1">
        <div className="">
          <div className="">
            <div className="">
              <button className=""></button>
              <button className=""></button>
              <button className=""></button>
            </div>
          </div>

          <div className="">
            <div className="">
              <div className="">
                <div className=""></div>
                <div className=""></div>
              </div>
            </div>
            <progress value="0" max="100" className=""></progress>
          </div>

          <div className="">
            <div className="">
              <button className=""></button>
            </div>

            <div className="">
              <div className="">
                <div className="">
                  <span>00:00</span>
                </div>

                <div className="">/</div>
              </div>

              <div className="">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={
          "text-[0.9rem] leading-none" + (theme === "dark" ? " text-white" : "")
        }
      >
        <ul className="flex gap-[0.313rem]">
          <li>
            <Link href="/tracks" className="px-[0.9375rem] hover:underline">
              Music
            </Link>
          </li>
          <li>
            <Link href="/artists" className="px-[0.9375rem] hover:underline">
              Artists
            </Link>
          </li>
          <li>
            <Link href="/albums" className="px-[0.9375rem] hover:underline">
              Albums
            </Link>
          </li>
          <li>
            <Link href="/playlists" className="px-[0.9375rem] hover:underline">
              Playlists
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
