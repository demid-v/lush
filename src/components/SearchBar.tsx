import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/router";

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
            className="search-bar__clear-input absolute right-[0.313rem] top-1/2 w-[1.563rem] -translate-y-1/2"
            onClick={clearField}
          >
            <svg
              className="mx-auto w-search_bar__first_row__button_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.001 512.001"
            >
              <path
                d="M294.111,256.001L504.109,46.003c10.523-10.524,10.523-27.586,0-38.109c-10.524-10.524-27.587-10.524-38.11,0L256,217.892
                L46.002,7.894c-10.524-10.524-27.586-10.524-38.109,0s-10.524,27.586,0,38.109l209.998,209.998L7.893,465.999
                c-10.524,10.524-10.524,27.586,0,38.109c10.524,10.524,27.586,10.523,38.109,0L256,294.11l209.997,209.998
                c10.524,10.524,27.587,10.523,38.11,0c10.523-10.524,10.523-27.586,0-38.109L294.111,256.001z"
              />
            </svg>
          </button>
        </div>
        <button className="h-full w-search_bar__first_row__button border border-[#b4b4b4]">
          <svg
            className="mx-auto w-search_bar__first_row__button_icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.005 512.005"
          >
            <path
              d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
            />
          </svg>
        </button>
        <button className="h-full w-search_bar__first_row__button border border-[#b4b4b4]">
          <svg
            className="mx-auto w-search_bar__first_row__button_icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 426.66667 426.66667"
          >
            <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
          </svg>
        </button>
        <button className="h-full w-search_bar__first_row__button border border-[#b4b4b4]">
          <svg
            className="mx-auto w-[0.938rem]"
            viewBox="0 0 512.002 512.002"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g>
                <path
                  d="M509.5,147.569l-68.267-68.267c-3.328-3.336-8.738-3.336-12.066,0c-3.336,3.337-3.336,8.73,0,12.066l62.234,62.234
			l-62.234,62.234c-3.336,3.336-3.336,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5l68.267-68.267
			C512.836,156.299,512.836,150.906,509.5,147.569z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M509.5,352.369l-68.267-68.267c-3.328-3.337-8.738-3.337-12.066,0c-3.336,3.337-3.336,8.73,0,12.066l62.234,62.234
			l-62.234,62.234c-3.336,3.337-3.336,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5l68.267-68.267
			C512.836,361.099,512.836,355.706,509.5,352.369z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M503.467,349.869h-85.333c-66.167,0-118.212-32.99-154.692-98.039c-39.159-69.845-97.801-106.761-169.574-106.761H8.533
			c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c66.167,0,118.212,32.99,154.692,98.039
			c39.159,69.845,97.801,106.761,169.574,106.761h85.333c4.71,0,8.533-3.823,8.533-8.533S508.177,349.869,503.467,349.869z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M503.467,145.069h-85.333c-71.774,0-130.415,36.915-169.574,106.761c-36.48,65.05-88.525,98.039-154.692,98.039H8.533
			c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c71.774,0,130.415-36.915,169.574-106.761
			c36.48-65.05,88.525-98.039,154.692-98.039h85.333c4.71,0,8.533-3.823,8.533-8.533S508.177,145.069,503.467,145.069z"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
      <div className="search-bar__genres"></div>
    </div>
  );
};

export default SearchBar;
