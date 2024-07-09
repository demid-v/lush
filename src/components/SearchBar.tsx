import { type ChangeEvent } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/Theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();

  const searchString = searchParams?.get("q")?.toString();

  const pathname = usePathname();
  const { replace } = useRouter();

  const { theme } = useTheme();

  if (searchParams === null) return null;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    if (value === "") newSearchParams.delete("q");
    else newSearchParams.set("q", value);

    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const clearField = () => {
    replace(`${pathname}`);
  };

  return (
    <div className="mr-3 flex gap-4">
      <div className="relative flex h-5 w-36 overflow-hidden rounded-full border border-gray-300">
        <input
          className="h-full w-full rounded-full pl-2 pr-7 text-sm"
          type="text"
          placeholder="search..."
          value={searchString}
          onChange={handleSearch}
        />
        <button
          aria-label="Clear input in the search bar"
          className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
          onClick={clearField}
        >
          <Image
            src="/assets/cross.svg"
            alt=""
            width={10}
            height={10}
            className="mx-auto w-2"
          />
        </button>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.005 512.005"
        className="mx-auto w-3"
      >
        <path
          d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
          fill={theme === "dark" ? "white" : "black"}
        />
      </svg>
    </div>
  );
};

export default SearchBar;
