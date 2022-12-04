import SearchBar from "./SearchBar";
import { FC, ReactNode, useEffect } from "react";

const Container: FC<{
  children: ReactNode;
  updateData: Function;
}> = ({ children, updateData }) => {
  function checkPosition() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      updateData();
    }
  }

  function addOnScrollListener() {
    document.addEventListener("scroll", checkPosition);

    return () => {
      document.removeEventListener("scroll", checkPosition);
    };
  }

  useEffect(addOnScrollListener, []);

  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div>{children}</div>
    </div>
  );
};

export default Container;
