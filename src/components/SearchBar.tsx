import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const SearchBar = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { q } = query;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (q === undefined) {
      setSearch("");
    } else if (Array.isArray(q)) {
      setSearch(q.join(""));
    } else {
      setSearch(q);
    }
  }, [q]);

  function handleSearch(event: ChangeEvent) {
    const inputValue = (event.target as HTMLInputElement).value;

    setSearch(inputValue);
    setSearchTimeout(inputValue);
  }

  function setSearchTimeout(inputValue: string) {
    if (inputValue === "") {
      delete router.query.q;
    } else {
      router.query.q = inputValue;
    }

    router.push({ pathname, query }, undefined, { shallow: true });
  }

  function clearField() {
    delete router.query.q;
    router.push({ pathname, query }, undefined, { shallow: true });
  }

  return (
    <div className="mt-[1.5625rem] mb-[0.9375rem]">
      <div className="flex h-[1.875rem] w-full gap-[0.625rem]">
        <div className="relative flex-1 border border-[#b4b4b4]">
          <input
            className="h-full w-full px-0.5 text-[1.02rem]"
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
        <button className="h-full w-[2.813rem] border border-[#b4b4b4]">
          <Image
            src="/assets/loupe.svg"
            alt="Loupe"
            width={10}
            height={10}
            className="mx-auto w-[0.625rem]"
          />
        </button>
        <button className="h-full w-[2.813rem] border border-[#b4b4b4]">
          <Image
            src="/assets/plus.svg"
            alt="Plus sign"
            width={10}
            height={10}
            className="mx-auto w-[0.625rem]"
          />
        </button>
        <button className="h-full w-[2.813rem] border border-[#b4b4b4]">
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
