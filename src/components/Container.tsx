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

  useLayoutEffect(() => mainItemContainer?.current?.focus(), []);

  function scrollToTop() {
    mainItemContainer?.current?.scrollTo(0, 0);
  }

  const router = useRouter();
  const { q: query } = router.query;

  useEffect(scrollToTop, [query]);

  return (
    <div className="container">
      <SearchBar />
      <div
        className="main-items-container scroll-y"
        tabIndex={-1}
        ref={mainItemContainer}
        onScroll={checkPosition}
      >
        <ul className={"container-" + layout}>{children}</ul>
      </div>
    </div>
  );
};

export default Container;
