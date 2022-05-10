import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/searchBar.css";

function SearchBar({ abortController }: { abortController: AbortController }) {
  function clearField() {
    console.log("clearField");
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const [query, setQuery] = useState(inputValue);

  useEffect(() => {
    setInputValue(searchParams.get("q") || "");
    setQuery(inputValue);
  }, [searchParams]);

  function handleInputChange(event: FormEvent) {
    abortController.abort();
    setInputValue((event.target as HTMLInputElement).value);
  }

  function changeQueryParams(query: string) {
    if (query === "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: query });
    }
  }

  function search() {
    if (inputValue !== query) {
      changeQueryParams(inputValue);
    }
  }

  return (
    <div className="search-bar">
      <div className="search-bar__first-row">
        <div className="search-bar__input-bar">
          <input
            className="search-bar__field lush-input"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={search}
          />
          <button
            className="search-bar__clear-input"
            onClick={clearField}
          ></button>
        </div>
        <div className="search-bar__right-tab">
          <button className="search-bar__search-button search-bar__button"></button>
          <button className="search-bar__add-button search-bar__button"></button>
          <button className="search-bar__shuffle-button search-bar__button"></button>
        </div>
      </div>
      <div className="search-bar__genres"></div>
    </div>
  );
}

export default SearchBar;
