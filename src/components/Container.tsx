import SearchBar from "./SearchBar";
import { type FC, type ReactNode, useEffect } from "react";

const Container: FC<{
  children: ReactNode;
  updateData: () => void;
}> = ({ children, updateData }) => {
  useEffect(() => {
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

    addOnScrollListener();
  }, [updateData]);

  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div>{children}</div>
    </div>
  );
};

export default Container;
