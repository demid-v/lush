import SearchBar from "./SearchBar";
import { FC, ReactNode, useRef } from "react";

const Container: FC<{
  children: ReactNode;
  bottomHit: boolean;
  setBottomHit: Function;
  updateData: Function;
}> = ({ children, bottomHit, setBottomHit, updateData }) => {
  function checkPosition() {
    if (
      !bottomHit &&
      mainItemContainer.current &&
      mainItemContainer.current.scrollHeight -
        mainItemContainer.current.offsetHeight -
        200 <=
        mainItemContainer.current.scrollTop
    ) {
      setBottomHit(true);
      updateData();
    }
  }

  const mainItemContainer = useRef<HTMLDivElement | null>(null);

  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div onScroll={checkPosition}>
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default Container;
