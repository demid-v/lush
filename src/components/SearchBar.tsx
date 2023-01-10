import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { spreadParam } from "../utils/functions";

const SearchBar = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { id, q } = query;

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(spreadParam(q) || "");
  }, [q]);

  function handleSearch(event: ChangeEvent) {
    const inputValue = (event.target as HTMLInputElement).value;

    setSearch(inputValue);

    if (inputValue === "") {
      delete router.query.q;
    } else {
      router.query.q = inputValue;
    }

    const url = (id || "") + (inputValue === "" ? "" : "?q=" + inputValue);
    router.push({ pathname, query }, url, { shallow: true });
  }

  function clearField() {
    delete router.query.q;
    router.push({ pathname, query }, spreadParam(id), { shallow: true });
  }

  return (
    <div className="relative mr-6 flex h-5 w-48 overflow-hidden rounded-full border border-[#b4b4b4]">
      <input
        className="h-full w-full rounded-full pl-2 pr-10 text-sm"
        type="text"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      />
      <button
        className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
        onClick={clearField}
      >
        <Image
          src="/assets/cross.svg"
          alt="Cross"
          width={10}
          height={10}
          className="mx-auto w-2"
        />
      </button>
    </div>
  );
};

export default SearchBar;
