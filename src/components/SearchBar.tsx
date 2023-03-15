import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { encode, joinParam } from "../utils/functions";
import { useTheme } from "../contexts/Theme";
import { useDecodedQuery } from "../utils/hooks";

const SearchBar = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { id } = query;

  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const decodedQuery = useDecodedQuery();

  const isTyping = useRef(false);

  useEffect(() => {
    if (isTyping.current) return;

    if (!decodedQuery) {
      setIsVisible(false);
      setSearch("");
      return;
    }

    setSearch(decodedQuery);
    setIsVisible(true);
  }, [decodedQuery]);

  function handleSearch(event: ChangeEvent) {
    isTyping.current = true;

    const inputValue = (event.target as HTMLInputElement).value;

    setSearch(inputValue);

    const inputValueEncoded = encode(inputValue);

    if (inputValueEncoded === "") {
      delete router.query.q;
    } else {
      router.query.q = inputValueEncoded;
    }

    const url =
      (id ?? "") + (inputValueEncoded === "" ? "" : "?q=" + inputValueEncoded);
    updateRouter(url);
  }

  const timer = useRef<NodeJS.Timeout | null>(null);

  function updateRouter(url: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      router.push({ pathname, query }, url, { shallow: true });
      isTyping.current = false;
    }, 500);
  }

  function clearField() {
    delete router.query.q;
    router.push({ pathname, query }, joinParam(id), { shallow: true });
  }

  return (
    <div className="mr-3 flex gap-4">
      <div
        className={
          "relative flex h-5 w-36 overflow-hidden rounded-full border border-gray-300" +
          (isVisible ? "" : " invisible")
        }
      >
        <input
          className="h-full w-full rounded-full pl-2 pr-7 text-sm"
          type="text"
          placeholder="search..."
          value={search}
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
      <button
        aria-label="Open the search bar"
        onClick={() => setIsVisible((prevState) => !prevState)}
      >
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
      </button>
    </div>
  );
};

export default SearchBar;
