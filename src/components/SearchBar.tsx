import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  function clearField() {
    router.query.q = undefined;
    router.push(router);
  }

  const router = useRouter();
  const { q } = router.query;

  const [searchQuery, setSearchQuery] = useState(q || "");

  function setQuery() {
    if (searchQuery === "") {
      delete router.query.q;
    } else {
      router.query.q = searchQuery;
    }

    router.push(router);
  }

  function setValue(event: FormEvent) {
    setSearchQuery((event.target as HTMLInputElement).value);
  }

  function checkQuery() {
    if (searchQuery !== q) {
      setQuery();
    }
  }

  useEffect(checkQuery, [searchQuery]);

  return (
    <div className="search-bar">
      <div className="search-bar__first-row">
        <div className="search-bar__input-bar">
          <input
            className="search-bar__field lush-input"
            type="text"
            placeholder="Search"
            onKeyUp={setValue}
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
};

export default SearchBar;
