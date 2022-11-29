import SearchBar from "./SearchBar";
import { FC, ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";

const Container: FC<{
  children: ReactNode;
  layout: "flex" | "grid";
  bottomHit: boolean;
  setBottomHit: Function;
  updateData: Function;
}> = ({ children, layout, bottomHit, setBottomHit, updateData }) => {
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
      <div className="" onScroll={checkPosition}>
        <ul className={"container-" + layout}>{children}</ul>
      </div>
    </div>
  );
};

export default Container;
