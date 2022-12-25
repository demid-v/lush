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
    <div className="sticky top-12 z-20 mt-[1.5625rem] mb-[0.9375rem]">
      <div className="flex h-[1.875rem] w-full gap-[0.625rem]">
        <div className="relative flex-1 border border-[#b4b4b4]">
          <input
            className="h-full w-full bg-white px-0.5 text-[1.02rem]"
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <button
            className="absolute right-[0.313rem] top-1/2 w-[1.563rem] -translate-y-1/2"
            onClick={clearField}
          >
            <Image
              src="/assets/cross.svg"
              alt="Cross"
              width={10}
              height={10}
              className="mx-auto w-[0.625rem]"
            />
          </button>
        </div>
        <button className="h-full w-[2.813rem] border border-[#b4b4b4] bg-white">
          <Image
            src="/assets/loupe.svg"
            alt="Loupe"
            width={10}
            height={10}
            className="mx-auto w-[0.625rem]"
          />
        </button>
        <button className="h-full w-[2.813rem] border border-[#b4b4b4] bg-white">
          <Image
            src="/assets/plus.svg"
            alt="Plus sign"
            width={10}
            height={10}
            className="mx-auto w-[0.625rem]"
          />
        </button>
        <button className="h-full w-[2.813rem] border border-[#b4b4b4] bg-white">
          <Image
            src="/assets/shuffle.svg"
            alt="Shuffle"
            width={10}
            height={10}
            className="mx-auto w-[0.938rem]"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
